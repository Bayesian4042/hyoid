import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { WebSocket } from "ws";
import { EventEmitter } from "events";
import { GroqService } from "src/modules/groq/groq.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AgentsService } from "src/agents/agents.service";
import { ElevenLabsService } from "src/modules/elevenlabs/elevenlabs.service";
import { IncomingMessage } from "http";

interface Connection {
	ws: WebSocket;
	chatHistory: any[];
	currentAudioTimer: NodeJS.Timeout | null;
	deepgramConnection: any;
}

enum voiceServiceType {
	DEEPGRAM = "deepgram",
	ELEVENLABS = "elevenlabs",
}

@Injectable()
export class VoiceConversationService
	extends EventEmitter
	implements OnModuleDestroy
{
	private logger = new Logger(VoiceConversationService.name);
	private connections: Map<string, Connection> = new Map();
	private deepgramClient;
	private welcomeMessage: string =
		"Hello, how are you today. Can I take your order please.";
	private voiceService: string = voiceServiceType.ELEVENLABS;

	constructor(
		private configService: ConfigService,
		private groqService: GroqService,
		private prismaService: PrismaService,
		private agentsService: AgentsService,
		private elevenLabsService: ElevenLabsService,
	) {
		super();
		this.deepgramClient = createClient(
			this.configService.get<string>("DEEPGRAM_API_KEY"),
		);
	}

	handleConnection(ws: WebSocket, request: IncomingMessage): void {
		this.logger.log("New Twilio WebSocket connection established");
		let streamSid: string | null = null;
		let agentId: string | null = null;
		let callerId: string | null = null;
		let elevenLabsWs = null;
		let workspaceId: string | null = null;

		ws.on("message", async (message: string) => {
			try {
				const msg = JSON.parse(message);

				if (msg.event === "start") {
					console.log("Received start event:", msg.start);
					const agentNumber =
						msg.start?.customParameters?.agentNumber;
					callerId = msg.start?.customParameters?.callerId;
					const agent =
						await this.agentsService.getAgent(agentNumber);
					agentId = agent.id;

					if (this.voiceService === voiceServiceType.ELEVENLABS) {
						elevenLabsWs =
							this.elevenLabsService.createConversatinalAIWebSocketConnection(
								agentId,
							);
						elevenLabsWs.on("message", (data: any) => {
							try {
								const message = JSON.parse(data);
								this.elevenLabsService.handleMessage(
									message,
									ws,
									streamSid,
								);
							} catch (error) {
								console.error(
									"[II] Error parsing message:",
									error,
								);
							}
						});
					}
				}

				if (this.voiceService === voiceServiceType.ELEVENLABS) {
					streamSid = msg.streamSid;
					this.handleElevenLabsMessage(msg, streamSid, elevenLabsWs);
				} else if (this.voiceService === voiceServiceType.DEEPGRAM) {
					this.handleDeepgramMessage(streamSid, msg, ws, agentId);
				}
			} catch (error) {
				console.error("Error processing message:", error);
			}
		});

		ws.on("close", async () => {
			console.log(
				"WebSocket connection closed for streamSid:",
				streamSid,
			);

			if (this.voiceService === voiceServiceType.ELEVENLABS) {
				const transcript = "";
				//   this.elevenLabsService.getConversationHistory(streamSid);
				// this.conversationService.saveDentalCallRecord(
				//   callerId,
				//   workspaceId,
				//   transcript,
				// );
				// this.elevenLabsService.cleanupConversation(streamSid);
			} else if (this.voiceService === voiceServiceType.DEEPGRAM) {
				if (streamSid) {
					const connection = this.connections.get(streamSid);
					if (connection?.deepgramConnection) {
						connection.deepgramConnection.finish();
					}
					this.connections.delete(streamSid);
				}
			}
		});
	}

	handleDisconnect(ws: WebSocket): void {
		console.log("Handling disconnect for WebSocket:");

		let streamSidToRemove: string | null = null;
		for (const [streamSid, connection] of this.connections.entries()) {
			if (connection.ws === ws) {
				streamSidToRemove = streamSid;
				break;
			}
		}

		if (streamSidToRemove) {
			console.log(
				`Removing connection for streamSid: ${streamSidToRemove}`,
			);
			const connection = this.connections.get(streamSidToRemove);
			if (connection) {
				if (connection.currentAudioTimer) {
					clearTimeout(connection.currentAudioTimer);
				}
				this.connections.delete(streamSidToRemove);
			}
		} else {
			console.log(
				"No matching streamSid found for disconnected WebSocket.",
			);
		}
	}

	/**
	 * Initializes a Deepgram live transcription connection for a given streamSid.
	 * @param ws - The WebSocket connection to communicate with the client.
	 * @param streamSid - The unique identifier for the media stream.
	 */
	private initializeDeepgram(
		ws: WebSocket,
		streamSid: string,
		agentId: string,
	): any {
		this.logger.log(
			`Initializing Deepgram connection for streamSid: ${streamSid}`,
		);
		try {
			const deepgramConnection = this.deepgramClient.listen.live({
				encoding: "mulaw",
				sample_rate: 8000,
				channels: 1,
				model: "nova-2",
				smart_format: true,
			});

			deepgramConnection.on(LiveTranscriptionEvents.Open, () => {
				this.logger.log(
					`Deepgram connection opened for streamSid: ${streamSid}`,
				);
			});

			deepgramConnection.on(
				LiveTranscriptionEvents.Close,
				(code: number, reason: string) => {
					this.logger.warn(
						`Deepgram connection closed for streamSid: ${streamSid}. Code: ${code}, Reason: ${reason}`,
					);
					ws.send(
						JSON.stringify({
							event: "error",
							message: "Deepgram connection closed unexpectedly.",
						}),
					);
				},
			);

			// Event: Transcript Received
			deepgramConnection.on(
				LiveTranscriptionEvents.Transcript,
				async (transcription: any) => {
					try {
						if (
							transcription.channel?.alternatives?.[0]?.transcript
						) {
							const transcript =
								transcription.channel.alternatives[0].transcript.trim();
							this.logger.log(
								`Transcript received for streamSid ${streamSid}: ${transcript}`,
							);

							if (transcript) {
								const connection =
									this.connections.get(streamSid);
								if (
									connection &&
									connection.currentAudioTimer
								) {
									clearTimeout(connection.currentAudioTimer);
									this.logger.debug(
										`Cleared existing audio timer for streamSid: ${streamSid}`,
									);
								}

								const messages = [
									...connection?.chatHistory,
									{
										role: "user",
										content: transcript,
									},
								];

								const systemPrompt =
									await this.getSystemPrompt(agentId);

								const response =
									await this.groqService.generateResponse(
										messages,
										systemPrompt,
									);

								this.logger.log(
									`Groq response for streamSid ${streamSid}: ${response}`,
								);

								connection.chatHistory.push({
									role: "user",
									content: transcript,
								});
								connection.chatHistory.push({
									role: "assistant",
									content: response,
								});

								if (connection.chatHistory.length > 40) {
									connection.chatHistory.splice(
										0,
										connection.chatHistory.length - 40,
									);
									this.logger.debug(
										`Chat history trimmed for streamSid: ${streamSid}`,
									);
								}

								const audioBuffer =
									await this.synthesizeAudio(response);
								connection.currentAudioTimer =
									this.sendAudioToClient(
										ws,
										audioBuffer,
										streamSid,
									);

								// Update connection state
								this.connections.set(streamSid, {
									...connection,
									ws: ws,
									chatHistory: connection.chatHistory,
									currentAudioTimer:
										connection.currentAudioTimer,
								});
							}
						}
					} catch (transcriptError) {
						console.error(transcriptError);
						this.logger.error(
							`Error processing transcript for streamSid ${streamSid}:`,
							transcriptError,
						);
						ws.send(
							JSON.stringify({
								event: "error",
								message: "Error processing transcript.",
							}),
						);
					}
				},
			);

			// Event: Deepgram Error
			deepgramConnection.on("error", (error: any) => {
				this.logger.error(
					`Deepgram connection error for streamSid ${streamSid}:`,
					error,
				);
				console.error(error);
				ws.send(
					JSON.stringify({
						event: "error",
						message: "Deepgram connection encountered an error.",
					}),
				);
				// this.cleanupConnection(streamSid);
			});

			// Store the Deepgram connection
			this.logger.debug(
				`Deepgram connection stored for streamSid: ${streamSid}`,
			);
			return deepgramConnection;
		} catch (error) {
			this.logger.error(
				`Failed to initialize Deepgram for streamSid ${streamSid}:`,
				error,
			);
			console.error(error.message);
			ws.send(
				JSON.stringify({
					event: "error",
					message: "Failed to initialize Deepgram connection.",
				}),
			);
			// Optionally, perform additional cleanup or retry logic here
		}
	}

	private async handleTwilioMessage(
		msg: any,
		clientWs: WebSocket,
		elevenLabsWs: WebSocket,
		streamSid: string,
	): Promise<void> {
		switch (msg.event) {
			case "start":
				streamSid = msg.start.streamSid;
				this.logger.log(`Stream started with ID: ${streamSid}`);
				break;

			case "media":
				if (elevenLabsWs?.readyState === WebSocket.OPEN) {
					const audioMessage: any = {
						user_audio_chunk: Buffer.from(
							msg.media.payload,
							"base64",
						).toString("base64"),
					};
					elevenLabsWs.send(JSON.stringify(audioMessage));
				}
				break;

			case "stop":
				elevenLabsWs?.close();
				break;

			default:
				this.logger.log(`Received unhandled event: ${msg.event}`);
		}
	}

	private async handleDeepgramMessage(
		streamSid: string,
		msg: any,
		ws: WebSocket,
		agentId: string,
	): Promise<void> {
		switch (msg.event) {
			case "start":
				streamSid = msg?.streamSid;

				// Initialize connection state
				const initialConnection = {
					ws,
					deepgramConnection: null,
					chatHistory: [],
					currentAudioTimer: null,
				};

				this.connections.set(streamSid, initialConnection);

				initialConnection.deepgramConnection = this.initializeDeepgram(
					ws,
					streamSid,
					agentId,
				);
				await this.sendWelcomeMessage(ws, streamSid, agentId);
				break;

			case "media":
				if (!streamSid) {
					console.error("No streamSid found for media event");
					return;
				}

				const connection = this.connections.get(streamSid);
				if (connection?.deepgramConnection) {
					const audio = Buffer.from(msg.media.payload, "base64");
					connection.deepgramConnection.send(audio);
				}
				break;

			case "stop":
				console.log("Stopping Media Stream:", msg.streamSid);
				if (streamSid) {
					const connection = this.connections.get(streamSid);
					if (connection?.deepgramConnection) {
						connection.deepgramConnection.finish();
					}
					this.connections.delete(streamSid);
				}
				break;
		}
	}

	private async handleElevenLabsMessage(
		msg: any,
		streamSid: string,
		elevenLabsWs: any,
	): Promise<void> {
		try {
			switch (msg.event) {
				case "start":
					console.log(
						`[Twilio] Stream started with ID: ${streamSid}`,
					);
					break;
				case "media":
					if (elevenLabsWs?.readyState === WebSocket.OPEN) {
						// data.media.payload is base64 encoded
						const audioMessage = {
							user_audio_chunk: Buffer.from(
								msg.media.payload,
								"base64",
							).toString("base64"),
						};
						elevenLabsWs?.send(JSON.stringify(audioMessage));
					}
					break;
				case "stop":
					elevenLabsWs?.close();
					break;
				default:
					console.log(
						`[Twilio] Received unhandled event: ${msg.event}`,
					);
			}
		} catch (error) {
			console.error("[Twilio] Error processing message:", error);
		}
	}
	private async sendWelcomeMessage(
		ws: WebSocket,
		streamSid: string,
		agentId?: string,
	): Promise<void> {
		console.log("Sending welcome message:", this.welcomeMessage);

		try {
			// Synthesize welcome message into audio buffer
			const welcomeAudioBuffer = await this.synthesizeAudio(
				this.welcomeMessage,
			);

			// Send audio to client after a short delay
			const audioTimer = this.sendAudioToClient(
				ws,
				welcomeAudioBuffer,
				streamSid,
			);

			// Update stored connection state
			const connection = this.connections.get(streamSid);
			if (connection) {
				connection.currentAudioTimer = audioTimer;
			}

			console.log("Welcome message sent successfully");
		} catch (error) {
			console.error("Error sending welcome message:", error);
		}
	}

	private async getSystemPrompt(agentId: string): Promise<string> {
		const existingAgent = await this.prismaService.agent.findUnique({
			where: { id: agentId },
		});

		if (!existingAgent.systemPrompt) {
			this.logger.warn(
				"No active system prompt found, using fallback prompt",
			);
			return "You are an helpfull assitant";
		}

		return existingAgent.systemPrompt;
	}

	private async synthesizeAudio(text: string): Promise<Buffer> {
		const response = await this.deepgramClient.speak.request(
			{ text },
			{
				model: "aura-helios-en",
				encoding: "mulaw",
				container: "none",
				sample_rate: 8000,
			},
		);

		const stream = await response.getStream();
		if (stream) {
			return await this.getAudioBuffer(stream);
		} else {
			throw new Error("Error generating audio");
		}
	}

	private async getAudioBuffer(response: any): Promise<Buffer> {
		const reader = response.getReader();
		const chunks: Uint8Array[] = [];

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
		}

		return Buffer.concat(chunks);
	}

	private sendAudioToClient(
		ws: WebSocket,
		audioBuffer: Buffer,
		streamSid: string,
	): NodeJS.Timeout {
		if (ws.readyState === WebSocket.OPEN) {
			return setTimeout(() => {
				ws.send(
					JSON.stringify({
						event: "media",
						sequenceNumber: "4",
						media: {
							track: "outbound",
							chunk: "2",
							timestamp: "4",
							payload: audioBuffer.toString("base64"),
						},
						streamSid: streamSid,
					}),
				);
			}, 100);
		} else {
			console.error(
				`WebSocket is not open for streamSid ${streamSid}. Cannot send audio.`,
			);
			return null;
		}
	}

	// Function to close a specific connection by streamSid
	public closeConnectionByStreamSid(streamSid: string): void {
		const conn = this.connections.get(streamSid);
		if (conn && conn.ws && conn.ws.readyState === WebSocket.OPEN) {
			console.log(`Closing connection for streamSid: ${streamSid}`);
			conn.ws.close(1000, "Closing connection manually");
			this.connections.delete(streamSid);
		} else {
			console.log(
				`No active connection found for streamSid: ${streamSid}`,
			);
		}
	}

	onModuleDestroy() {
		// Implement any necessary cleanup
		for (const [streamSid, conn] of this.connections.entries()) {
			conn.ws.close(1000, "Server shutting down");
			this.connections.delete(streamSid);
		}
	}
}

import { Injectable, Logger } from "@nestjs/common";
import { IncomingMessage } from "http";
import { tools } from "src/llm-tools/constants/tools.contant";
import { OpenAIWrapper } from "src/modules/openai/openai.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { WebSocket } from "ws";

interface ChatSession {
	messages: { role: "user" | "assistant" | "system"; content: string }[];
	summary?: string;
}

@Injectable()
export class TextConversationService {
	private logger = new Logger(TextConversationService.name);
	private chatSessions: Map<string, ChatSession> = new Map();

	constructor(
		private readonly openAiService: OpenAIWrapper,
		private readonly ragService: RagService,
		private readonly prismaService: PrismaService,
	) {}

	async handleConnection(ws: WebSocket, request: IncomingMessage) {
		console.log(`Agent connected:`);
		let agentId = null;
		let isAgentAvailable = false;

		ws.on("message", async (message: string) => {
			try {
				const data = JSON.parse(message.toString());
				console.log("data", data);
				agentId = data.agentId;

				if (!isAgentAvailable) {
					if (!this.chatSessions.has(agentId)) {
						this.chatSessions.set(agentId, {
							messages: [
								{
									role: "system",
									content:
										"You are a helpful assistant",
								},
							],
						});
					}
					isAgentAvailable = true;
				}

				const session = this.chatSessions.get(agentId);

				const relevantContext = await this.ragService.searchSimilarText(
					data.message,
					agentId,
				);

				if (relevantContext) {
					session.messages.push({
						role: "assistant",
						content: relevantContext,
					});
				}

				session.messages.push({ role: "user", content: data.message });

				const response = await this.openAiService.generateChatResponse(
					session.messages,
					{ 
                        outputFormat: "string",
                        tools: tools,
                    },
				);

				session.messages.push({
					role: "assistant",
					content: response.content as string,
				});

				// if (session.messages.length % 5 === 0) {
				//     const summaryResponse = await this.openAiService.generateResponse(
				//         `Summarize the conversation between user and assistant: \n ${session.messages.map((message) => `${message.role}: ${message.content}`).join('\n')}`
				//     );
				//     session.summary = summaryResponse.content as string;
				// }

				ws.send(
					JSON.stringify({
						type: "message",
						value: response,
					}),
				);

				// ws.send(JSON.stringify({ type: 'typing', value: false }));
			} catch (error) {
				console.error("Error processing message:", error);
				ws.send(
					JSON.stringify({
						type: "error",
						value: "Error processing your message",
					}),
				);
			}
		});

		ws.on("close", () => {
			console.log("Client disconnected");
		});

		ws.on("error", (error) => {
			console.error("WebSocket error:", error);
		});
	}

	private async getSystemPrompt(agentId: string): Promise<string> {
		const existingAgent = await this.prismaService.agent.findUnique({
			where: { id: agentId },
		});

		if (!existingAgent.systemPrompt) {
			this.logger.warn(
				"No active system prompt found, using fallback prompt",
			);
			return "You are an helpfull assistant";
		}

		return existingAgent.systemPrompt;
	}
}

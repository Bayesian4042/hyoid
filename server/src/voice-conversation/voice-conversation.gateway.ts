// src/twilio/twilio.gateway.ts

import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "ws";
import { IncomingMessage } from "http";
import { VoiceConversationService } from "./voice-conversation.service";

@WebSocketGateway({
	path: "/twilio",
})
export class VoiceConversationGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly voiceConversationService: VoiceConversationService,
	) {}

	handleConnection(client: any, request: IncomingMessage) {
		console.log("Twilio WebSocket client connected:");
		this.voiceConversationService.handleConnection(client, request);
	}

	handleDisconnect(client: any) {
		console.log("Twilio WebSocket client disconnected:");
		this.voiceConversationService.handleDisconnect(client);
	}
}

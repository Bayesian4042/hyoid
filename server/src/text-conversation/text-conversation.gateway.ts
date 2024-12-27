// src/twilio/twilio.gateway.ts

import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
} from "@nestjs/websockets";
import { Server } from "ws";
import { IncomingMessage } from "http";
import { TextConversationService } from "./text-conversation.service";

@WebSocketGateway({
	path: "/test",
})
export class TextConversationGateway {
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly voiceConversationService: TextConversationService,
	) {}

	handleConnection(client: any, request: IncomingMessage) {
		console.log("Twilio WebSocket client connected:");
		this.voiceConversationService.handleConnection(client, request);
	}

	handleDisconnect(client: any) {
		console.log("Twilio WebSocket client disconnected:");
		// this.voiceConversationService.handleDisconnect(client);
	}
}

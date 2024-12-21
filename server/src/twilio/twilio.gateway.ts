// src/twilio/twilio.gateway.ts

import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
} from "@nestjs/websockets";
import { TwilioService } from "./twilio.service";
import { Server } from "ws";
import { IncomingMessage } from "http";

@WebSocketGateway({
	path: "/twilio",
})
export class TwilioGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(private readonly twilioService: TwilioService) {}

	handleConnection(client: any, request: IncomingMessage) {
		console.log("Twilio WebSocket client connected:");
		this.twilioService.handleConnection(client, request);
	}

	handleDisconnect(client: any) {
		console.log("Twilio WebSocket client disconnected:");
		this.twilioService.handleDisconnect(client);
	}
}

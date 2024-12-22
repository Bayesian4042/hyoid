// src/twilio/twilio.controller.ts
import { Body, Controller, Get, Logger, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("conversations")
export class VoiceConversationController {
	private logger = new Logger(VoiceConversationController.name);
	constructor(
		private readonly configService: ConfigService,
	) {}

	@Get("/")
	getRoot(@Res() res: Response) {
		res.type("text").send("Twilio media stream transcriber");
	}

	@Get("/incoming-call")
	async handleTwilioStream(@Body() body: any, @Res() res: Response) {
		try {
			console.log("Incoming call from Twilio", body);
			const agentNumber: string = body.To;
			const wsUrl = this.configService.get<string>("DOMAIN");
			const twilioPort = this.configService.get<number>("PORT") || 3001;

			console.log(`Incoming call from Twilio`);

			res.type("xml").send(
				`<Response>
            <Connect>
                <Stream url='wss://${wsUrl}/twilio'>
					<Parameter name="agentNumber" value="${agentNumber}" />
				</Stream>
            </Connect>
            </Response>`,
			);
		} catch (error) {
			console.error(error);
			res.status(500).send(
				`<Response>
            <Say>Sorry, an error occurred</Say>
        </Response>`,
			);
		}
	}
}

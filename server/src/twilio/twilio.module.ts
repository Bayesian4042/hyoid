// src/twilio/twilio.module.ts
import { Module } from "@nestjs/common";
import { TwilioController } from "./twilio.controller";
import { TwilioService } from "./twilio.service";
import { ConfigModule } from "@nestjs/config";
import { TwilioGateway } from "./twilio.gateway";
import { GroqService } from "src/modules/groq/groq.service";
import { DeepgramService } from "src/modules/deepgram/deepgram.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AgentsService } from "src/agents/agents.service";
import { ElevenLabsService } from "src/modules/elevenlabs/elevenlabs.service";

@Module({
	imports: [ConfigModule],
	controllers: [TwilioController],
	providers: [
		TwilioService,
		TwilioGateway,
		GroqService,
		DeepgramService,
		PrismaService,
		AgentsService,
		ElevenLabsService,
	],
})
export class TwilioModule {}

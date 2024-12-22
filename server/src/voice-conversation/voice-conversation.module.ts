// src/twilio/twilio.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GroqService } from "src/modules/groq/groq.service";
import { DeepgramService } from "src/modules/deepgram/deepgram.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AgentsService } from "src/agents/agents.service";
import { ElevenLabsService } from "src/modules/elevenlabs/elevenlabs.service";
import { VoiceConversationController } from "./voice-conversation.controller";
import { VoiceConversationService } from "./voice-conversation.service";
import { VoiceConversationGateway } from "./voice-conversation.gateway";

@Module({
	imports: [ConfigModule],
	controllers: [VoiceConversationController],
	providers: [
		VoiceConversationService,
		VoiceConversationGateway,
		GroqService,
		DeepgramService,
		PrismaService,
		AgentsService,
		ElevenLabsService,
	],
})
export class TwilioModule {}

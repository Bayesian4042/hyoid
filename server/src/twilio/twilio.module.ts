// src/twilio/twilio.module.ts
import { Module } from '@nestjs/common';
import { TwilioController } from './twilio.controller';
import { TwilioService } from './twilio.service';
import { ConfigModule } from '@nestjs/config';
import { TwilioGateway } from './twilio.gateway';
import { ConnectionsService } from 'src/connections/connections.service';
import { GroqService } from 'src/modules/groq/groq.service';
import { DeepgramService } from 'src/modules/deepgram/deepgram.service';

@Module({
  imports: [ConfigModule],
  controllers: [TwilioController],
  providers: [TwilioService, TwilioGateway, GroqService, DeepgramService],
})
export class TwilioModule {}

// src/twilio/twilio.controller.ts
import { Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from './twilio.service';

@Controller('conversations')
export class TwilioController {
    private logger = new Logger(TwilioController.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly twilioService: TwilioService,
  ) {}

  @Get('/')
  getRoot(@Res() res: Response) {
    res.type('text').send('Twilio media stream transcriber');
  }

  @Post('/incoming-call')
  async handleTwilioStream(@Res() res: Response) {
    try {
        console.log('Incoming call from Twilio');
        const wsUrl = this.configService.get<string>('DOMAIN');
        const twilioPort = this.configService.get<number>('PORT') || 3001;

        console.log(`Incoming call from Twilio`);

        res.type('xml').send(
        `<Response>
            <Connect>
                <Stream url='wss://${wsUrl}/twilio' />
            </Connect>
            </Response>`,
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).send(
        `<Response>
            <Say>Sorry, an error occurred</Say>
        </Response>`,
        );
    }
    }   
}

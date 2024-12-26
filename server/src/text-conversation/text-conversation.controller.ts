import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { TextConversationService } from './text-conversation.service';

@Controller('text-conversation')
export class TextConversationController {
  constructor(private readonly textConversationService: TextConversationService) {}

  @Get('chat')
  async startChat() {
    try {
      const wsEndpoint = `ws://localhost:8000/test`;
      return {
        status: 'success',
        message: 'Chat session initiated',
        wsEndpoint,
        isStreaming: true
      };
    } catch (error) {
      throw new HttpException('Failed to start chat session', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post(':agentId')
  async processText(
    @Body() dto: { text: string },
    @Param('agentId') userId: string,
  ) {
    try {
      await this.ragService.processText(dto.text, userId);
      return {
        success: true,
        message: 'Text processed and vectors created successfully',
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error processing text',
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

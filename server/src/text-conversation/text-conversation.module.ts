import { Module } from '@nestjs/common';
import { TextConversationService } from './text-conversation.service';
import { TextConversationController } from './text-conversation.controller';
import { OpenAIWrapper } from 'src/modules/openai/openai.service';
import { TextConversationGateway } from './text-conversation.gateway';
import { RagService } from 'src/rag/rag.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TextConversationController],
  providers: [TextConversationService, OpenAIWrapper, TextConversationGateway, RagService, PrismaService],
})
export class TextConversationModule {}

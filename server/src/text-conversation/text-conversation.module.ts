import { Module } from '@nestjs/common';
import { TextConversationService } from './text-conversation.service';
import { TextConversationController } from './text-conversation.controller';
import { OpenAIWrapper } from 'src/modules/openai/openai.service';
import { TextConversationGateway } from './text-conversation.gateway';

@Module({
  controllers: [TextConversationController],
  providers: [TextConversationService, OpenAIWrapper, TextConversationGateway],
})
export class TextConversationModule {}

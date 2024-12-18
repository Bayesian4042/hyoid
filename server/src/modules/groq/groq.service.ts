import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Groq } from 'groq-sdk';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class GroqService {
  private readonly logger = new Logger(GroqService.name);
  private readonly groqClient: Groq;
  private readonly systemPrompt = `You work at a London Sandwich Bar and you're answering the phone taking people's takeaway orders. You'll be friendly and helpful and try to get people to buy the muscle and pickled sandwich as that is the special for today which costs four pounds each. Soft drinks cost one pound and there are six different types of cake that cost £2 per slice. Once you've taken their order you will read it back to them and tell them to have a nice day. Most importantly, keep all of your conversations to 20 words or less. At the start of the order, please ask me for my name and also what time I wish to pick up the order before you start taking my order.`;

  constructor(private readonly configService: ConfigService) {
    this.groqClient = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async generateResponse(chatHistory: ChatMessage[]): Promise<string> {
    try {
      const messages: any = [
        {
          role: 'system',
          content: this.systemPrompt,
        },
        ...chatHistory,
      ];

      const completion = await this.groqClient.chat.completions.create({
        messages,
        model: 'llama3-8b-8192',
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      this.logger.error('Error generating Groq response:', error);
      throw error;
    }
  }
}
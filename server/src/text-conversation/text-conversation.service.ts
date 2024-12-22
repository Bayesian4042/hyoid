import { Injectable } from '@nestjs/common';
import { OpenAIWrapper } from 'src/modules/openai/openai.service';
import { WebSocket } from 'ws';

interface ChatSession {
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
    summary?: string;
}

@Injectable()
export class TextConversationService {
    private chatSessions: Map<string, ChatSession> = new Map();

    constructor(private readonly openAiService: OpenAIWrapper) {}
    
    handleConnection(ws: WebSocket, userId: string) {
        console.log(`Client connected: ${userId}`);

        if (!this.chatSessions.has(userId)) {
            this.chatSessions.set(userId, { messages: [
                {
                    "role": "system",
                    "content": "You are an helpful assitant which helps user with the any question."
                }
            ] });
        }

        ws.on('message', async (message: string) => {
            try {
                const data = JSON.parse(message.toString());
                console.log("data", data);
                const session = this.chatSessions.get(userId);
                
                session.messages.push({ role: 'user', content: data.message });

                // ws.send(JSON.stringify({ type: 'typing', value: true }));

                const response = await this.openAiService.generateChatResponse(session.messages, {outputFormat: 'string'});

                session.messages.push({ role: 'assistant', content: response.content as string });

                if (session.messages.length % 5 === 0) {
                    const summaryResponse = await this.openAiService.generateResponse(
                        `Summarize the conversation between user and assistant: \n ${session.messages.map((message) => `${message.role}: ${message.content}`).join('\n')}`
                    );
                    session.summary = summaryResponse.content as string;
                }

                ws.send(JSON.stringify({
                    type: 'message',
                    value: response
                }));

                ws.send(JSON.stringify({ type: 'typing', value: false }));

            } catch (error) {
                console.error('Error processing message:', error);
                ws.send(JSON.stringify({
                    type: 'error',
                    value: 'Error processing your message'
                }));
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }
}

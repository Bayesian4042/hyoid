export interface Agent {
    id: string,
    name: string,
    type: string,
    systemPrompt: string,
    firstMessage: string,
    llm: string,
    temperature: number,
    phoneNumber: number,
    createdAt: string,
    updatedAt: string
}



export interface ChatAgent {
    status: string,
    message: string,
    wsEndpoint: string,
    isStreaming: boolean
}

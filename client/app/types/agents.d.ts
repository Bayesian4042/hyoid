export interface Agent {
id:string,
name:string,
type:string,
systemPrompt:string,
firstMessage:string,
llm:string,
temperature:number,
phoneNumber:number,
createdAt:string,
updatedAt:string
}



interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: string;
  }
  
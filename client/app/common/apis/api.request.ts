import axios from "axios";
import { Agent, ChatAgent } from "~/types/agents";

const baseUrl = 'http://localhost:8000/agents'
const chatUrl = 'http://localhost:8000/text-conversation/chat'
const knowledgeBaseUrl = 'http://localhost:8000/rag'

export const getAllAgents = async(type:string):Promise<Agent[]> => {
    const response = await axios.get(`${baseUrl}?type=${type}`)
    return response.data.data;
}

export const createAgent = async(name:string,type:string):Promise<Agent> => {
    const response = await axios.post(`${baseUrl}`,{
   name,
   type
    })
    return response.data.data;
}

export const getAgent = async(id:string):Promise<Agent> => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data.data
}

export const updateAgent = async(id:string,firstMessage:string,systemPrompt:string,temperature:number):Promise<{}> => {
    const response = await axios.patch(`${baseUrl}/${id}`,{
        firstMessage,
        systemPrompt,
        temperature
    })
    return response.data.data
}

export const getChat = async(): Promise<ChatAgent> => {
    const response = await axios.get(`${chatUrl}`)
    return response.data
}

export const uploadText = async(agentId:string,content:string) => {
    const response = await axios.post(`${knowledgeBaseUrl}/${agentId}`,{
        "text":content
    })
    console.log(response)
}
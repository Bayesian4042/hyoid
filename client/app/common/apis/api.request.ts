import axios from "axios";

const baseUrl = 'http://localhost:8000/agents'

export const getAllAgents = async(type:string) => {
    const response = await axios.get(`${baseUrl}?type=${type}`)
    return response.data.data;
}

export const createAgent = async(name:string,type:string) => {
    const response = await axios.post(`${baseUrl}`,{
   name,
   type
    })
    return response.data.data;
}

export const getAgent = async(id:string) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data.data
}

export const updateAgent = async(id:string,firstMessage:string,systemPrompt:string,temperature:number) => {
    const response = await axios.patch(`${baseUrl}/${id}`,{
        firstMessage,
        systemPrompt,
        temperature
    })
    return response.data.data
}
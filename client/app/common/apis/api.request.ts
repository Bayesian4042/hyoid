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
    console.log(response.data.data);
}
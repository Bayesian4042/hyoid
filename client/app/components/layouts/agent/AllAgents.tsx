import { Flex } from 'antd';
import { LuBot } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { useLoaderData } from '@remix-run/react';


interface AllAgentsProps {
  setAgentId: (id: string) => void;
}

export default  function AllAgents(setAgentId:AllAgentsProps) {
    const agents = useLoaderData<any[]>()
  return (
    <div className='p-4'>
      {
        agents?.map((agent:any) => (
          <div onClick={() => setAgentId(agent.id)} key={agent.id}>
            <AgentLink title={agent.name} />
          </div>
        ))
    }
    </div>
  )
}


const AgentLink = ({ title }: { title: string}) => {
  return (<Flex justify='space-between' align='center' className='rounded-lg hover:bg-gray-50 p-3 cursor-pointer' >
    <Flex gap='small' align='center'>
      <div className='bg-gray-100 p-3  rounded-lg'>
        <LuBot size={20} />
      </div>
      <h1>{title}</h1>
    </Flex>
    <SlOptions size={10} />
  </Flex>)
}






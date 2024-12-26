import { Flex } from 'antd';
import { LuBot } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { AllAgentsProps } from '~/types/common';



export default  function AllAgents({setAgentId,agents}:AllAgentsProps) {
  return (
    <div className='p-4 h-[calc(100vh-64px)] overflow-y-scroll'>
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






import { Flex } from 'antd';
import { HiMenuAlt4 } from "react-icons/hi";
import { AllAgentsProps } from '~/types/common';
import { useLocation } from '@remix-run/react';
import EmojiAvatar from '~/components/ui/EmojiAvatar';



export default  function AllAgents({setAgentId,agents}:AllAgentsProps) {
  return (
    <div className='px-4 py-1 h-[calc(100vh-64px)] overflow-y-auto' style={{scrollbarWidth:"thin"}}>
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
  const {pathname} = useLocation()
  return (<Flex justify='space-between' align='center' className='rounded-lg hover:bg-gray-50 p-3 cursor-pointer' >
    <Flex gap='small' align='center'>
       <EmojiAvatar pathname={pathname}/> 
                  
      
      <h1 className='font-semibold text-sm'>{title}</h1>
    </Flex>
    <HiMenuAlt4 size={20} />
  </Flex>)
}






import { Flex } from 'antd';

import { LuBot } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";

export default function AllAgents() {
  return (
    <div className='p-4'>
      <AgentLink title='Test' />
      <AgentLink title='Test1' />
      <AgentLink title='Test2' />
      <AgentLink title='Test3' />
    </div>
  )
}


const AgentLink = ({ title }: { title: string }) => {
  return (<Flex justify='space-between' align='center' className='rounded-lg hover:bg-gray-50 p-3 cursor-pointer'>
    <Flex gap='small' align='center'>
      <div className='bg-gray-100 p-3  rounded-lg'>
        <LuBot size={20} />
      </div>
      <h1>{title}</h1>
    </Flex>
    <SlOptions size={10} />
  </Flex>)
}




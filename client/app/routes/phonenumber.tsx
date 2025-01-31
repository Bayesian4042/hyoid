import { Flex } from 'antd'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ConfigureAgent from '~/components/layouts/agent/ConfigureAgent';
import SelectAgent from '~/components/layouts/agent/SelectAgent';
import AddPhoneNumberDrawer from '~/components/layouts/drawer/AddPhoneNumberDrawer';
import HeaderWithAgent from '~/components/layouts/header/HeaderWithAgent';

const phonenumber = () => {
     const[open,setOpen] = useState<boolean>(false)
      const [agentId, setAgentId] = useState<string | null>(null);
      const [agents,setAgents] = useState<any[]>()

        const buttons = [
          { 
            icon: <IoMdAdd/>,
            action: () => setOpen(true)
          }
        ];

  return (
    <Flex className="w-full">
    <div className="flex-[0.30]">
      <HeaderWithAgent title='Phone Numbers' buttons={buttons} setAgentId={setAgentId} agents={agents} />
    </div>
    <div className="flex-[0.70]">
      {
    //   agentId ?
    // <ConfigureAgent agentId={agentId}/> 
    // :
    <SelectAgent setOpen={setOpen}/>
      }
    </div>
    <AddPhoneNumberDrawer setAgents={setAgents} setOpen={setOpen} open={open} title="Voice"/>
  </Flex>
  )
}

export default phonenumber
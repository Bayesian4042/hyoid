import { Button, Drawer, Flex, Input,Typography } from 'antd'
import Logo from '~/components/ui/Logo'
import { LuBot } from "react-icons/lu"
import { useState } from 'react'
import { createAgent } from '~/common/apis/api.request'
import { useLocation } from "@remix-run/react";

const AddAgentDrawer = ({setOpen,open,title}:any) => {
  const[agentName,setAgentName] = useState("");

  const {pathname} = useLocation()

  const handleCreate = async() => {
      await createAgent(agentName,pathname === "/" ? "voice" : "chat");
      setOpen(false);
  }
  return (
    <Drawer open={open} width={600} title={<Flex gap='small' align='center'><Logo logo={<LuBot size={27}/>}/> <h1>Create an {title} Agent</h1> </Flex>} onClose={() => setOpen(false)}>
  <Flex vertical justify='space-between' className='h-[calc(100vh-119px)]'>
    <div>
   <Typography.Title level={5}>Agent Name</Typography.Title>
    <Input placeholder='Enter name' value={agentName} onChange={(e)=> setAgentName(e.target.value)} className='py-2' />
    </div>
    <Flex justify='flex-end'>

    <Button className='w-fit' onClick={handleCreate}>Create Agent</Button>
    </Flex>
  </Flex>
        </Drawer>
  )
}

export default AddAgentDrawer
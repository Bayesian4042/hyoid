import {  Drawer, Flex, Input,Typography } from 'antd'
import EmojiAvatar from '~/components/ui/EmojiAvatar'
import { useState } from 'react'
import { createAgent, getAllAgents } from '~/common/apis/api.request'
import { useLocation } from "@remix-run/react";
import SubmitButton from '~/components/ui/SubmitButton'

const AddAgentDrawer = ({setOpen,open,setAgents}:any) => {
  const[agentName,setAgentName] = useState("");

  const {pathname} = useLocation()

  const handleCreate = async() => {
     await createAgent(agentName,pathname === "/" ? "voice" : "chat");
     const data = await getAllAgents(pathname === "/" ? "voice" : "chat");
     console.log(data)
     setAgents(data)
      setOpen(false);
  }
  return (
    <Drawer open={open} width={600} title={<Flex gap='small' align='center'><EmojiAvatar pathname={pathname}/>
               <h1 className='text-sm'>Create an {pathname === "/" ? "Voice"
              : "Chat"
              } Agent</h1> </Flex>} onClose={() => setOpen(false)}>
  <Flex vertical justify='space-between' className='h-[calc(100vh-129px)]'>
    <div>
   <Typography.Title level={5}>Agent Name</Typography.Title>
    <Input placeholder='Enter name' value={agentName} onChange={(e)=> setAgentName(e.target.value)} className='py-2' />
    </div>
    <div className='w-full text-center pb-20'>
      <SubmitButton text={`Create ${pathname === "/" ? "Voice":"Chat"} Agent`}
              action={handleCreate}
              />
    </div>
  </Flex>
        </Drawer>
  )
}

export default AddAgentDrawer
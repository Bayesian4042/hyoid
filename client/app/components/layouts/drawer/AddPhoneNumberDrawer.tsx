import { useLocation } from '@remix-run/react';
import { Drawer, Flex, Input, Select, Typography } from 'antd';
import React, { useState } from 'react'
import EmojiAvatar from '~/components/ui/EmojiAvatar';
import SubmitButton from '~/components/ui/SubmitButton';

const AddPhoneNumberDrawer = ({setOpen,open,setAgents}:any) => {
    const[agentName,setAgentName] = useState("");

    const {pathname} = useLocation()
  
    const handleCreate = async() => {
      
    }
    return (
      <Drawer open={open} width={500} title={<Flex gap='small' align='center'><EmojiAvatar pathname={pathname}/>
                 <h1 className='text-base'>Import phone number from Twilio</h1> </Flex>} onClose={() => setOpen(false)}>
    <Flex vertical justify='space-between' className='h-[calc(100vh-129px)]'>
      <div>
     <h1 className='font-semibold text-base'>Label</h1>
      <Input placeholder='To identify phone number easily' value={agentName} onChange={(e)=> setAgentName(e.target.value)} className='py-2' />
      <h1 className='font-semibold text-base mt-5'>Phone number</h1>
      <Flex gap={20}>
        <Select style={{width:120}} defaultValue="+91"/>
        <Input />
      </Flex>
     <h1 className='font-semibold text-base mt-5'>Twilio SID</h1>
      <Input placeholder='Twilio SID'  className='py-2' />
     <h1 className='font-semibold text-base mt-5'>Twilio Token</h1>
      <Input placeholder=''  className='py-2' />
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

export default AddPhoneNumberDrawer
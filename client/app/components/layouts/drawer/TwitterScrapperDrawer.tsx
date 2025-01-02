import { Button, Drawer, Flex, Input, Space } from "antd"
import EmojiAvatar from "~/components/ui/EmojiAvatar"
import React, { useState } from "react";
import { useLocation } from "@remix-run/react";
import SubmitButton from "~/components/ui/SubmitButton";

const TwitterScrapperDrawer:React.FC<any> = ({open,setOpen}) => {
    const {pathname} = useLocation()  
    const [name,setName] = useState<string>("")
    

  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><EmojiAvatar pathname={pathname}/> <h3>Add Twitter Username</h3></Flex>}>
      <Flex vertical justify="space-between" className="h-[calc(100vh-129px)]">
        <TextInput name={name} setName={setName}/>
        <Flex className="mb-20 px-20" gap={10} align="center" justify="space-between">
          <SubmitButton text="Add Item"/>
          <Button variant="outlined" color="danger" className="text-xl rounded-3xl px-10 py-5">Cancle</Button>
          </Flex>
      </Flex>
    </Drawer>
  )
}

export default TwitterScrapperDrawer



const TextInput:React.FC<any> = ({name,setName}) => {
   
    return (
        <Flex vertical justify="space-between">
        <Space className="w-full mt-2" direction="vertical">
        <p className="text-gray-500">Enter twitter username.</p>
       <h1 className="font-bold">Twitter Username</h1>
       <Input value={name} onChange={e => setName(e.target.value)}/>
          </Space>
        </Flex>
    )
}

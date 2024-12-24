import { Button, Drawer, Flex, Space, Typography } from "antd"
import Logo from "~/components/ui/Logo"
import { CiFileOn } from "react-icons/ci";
import { useState } from "react";

const KnowledgeBaseDrawer = ({open,setOpen}:any) => {
    const [selected,setSelected] = useState("file")
  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><Logo logo={<CiFileOn size={20}/>}/> <h3>Add Knowledge Base Item</h3></Flex>}>
        <Typography.Title level={5}>item type</Typography.Title>
        <Flex gap='small'>
            <Button className="w-full" onClick={() =>setSelected("file")}>File</Button>
            <Button className="w-full" onClick={() =>setSelected("url")}>Url</Button>
            <Button className="w-full" onClick={() =>setSelected("text")}>Text</Button>
        </Flex>
        <div>
            {selected === "file" ? <FIleInput/>:selected === "url" ? <UrlInput/> : <TextInput/>}
        </div>
    </Drawer>
  )
}

export default KnowledgeBaseDrawer


const FIleInput = () => {
    return (
        <div>
        <p className="mt-2">Upload files that will be passed to the LLM alongside the prompt.</p>
        <div className="border-[1px] p-4">
        </div>
        </div>
    )
}

const UrlInput = () => {
    return (
        <div>input</div>
    )
}

const TextInput = () => {
    return (
        <div>input</div>
    )
}
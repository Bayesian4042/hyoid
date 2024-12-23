import { Button, Flex } from "antd"
import AgentLogo from "./AgentLogo";

const SelectAgent = ({setOpen}:any) => {
  return (
    <Flex className="border-l-[1px] h-screen" justify="center" align="center" vertical>
            <AgentLogo size={27}/>
            <h1 className="font-semibold mt-3">No AI Agent Selected</h1>
            <p className="w-[63%] mt-2 text-center text-sm">Select an existing agent or create a new one to configure and test your conversational AI.</p>
            <Button className="mt-4" onClick={() => setOpen(true)}>Create an AI agent</Button>
    </Flex>
  )
}

export default SelectAgent
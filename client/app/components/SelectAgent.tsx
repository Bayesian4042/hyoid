import { Button, Flex } from "antd"
import { LuBot } from "react-icons/lu";

const SelectAgent = () => {
  return (
    <Flex className="border-l-[1px] h-screen" justify="center" align="center" vertical>
        <div className="border-[1px] rounded-lg p-3">
            <LuBot size={27}/>
        </div>
            <h1 className="font-semibold mt-3">No AI Agent Selected</h1>
            <p className="w-[63%] mt-2 text-center text-sm">Select an existing agent or create a new one to configure and test your conversational AI.</p>
            <Button className="mt-4">Create an AI agent</Button>
    </Flex>
  )
}

export default SelectAgent
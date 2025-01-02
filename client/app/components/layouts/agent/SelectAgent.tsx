import { Button, Flex } from "antd"
import { useLocation } from "@remix-run/react"
import { RiVoiceAiLine } from "react-icons/ri";
import { RiChatAiLine } from "react-icons/ri";
import SubmitButton from "~/components/ui/SubmitButton";

const SelectAgent = ({setOpen}:{setOpen : (isOpenKnowledgeBase: boolean) => void} ) => {
 const {pathname} = useLocation()

 console.log(pathname)
  return (
    <Flex className="border-l-2 h-screen" justify="center" align="center" vertical>
      <div className="rounded-full p-10 border-2 bg-gray-50">
      {pathname === "/" ? <RiVoiceAiLine size={100}/>
          : <RiChatAiLine size={100} />
          }
      </div>
            <h1 className="font-semibold text-sm mt-3">No {pathname === "/" ? "Voice":"Chat"} Agent Selected</h1>
            <p className="w-[63%] mt-2 text-center text-xs">Select an existing {pathname === "/" ? "Voice":"Chat"}  agent or create a new one to test your {pathname === "/" ? "Voice":"Chat"}  AI.</p>
            <div className="mt-32 w-full text-center">
            <SubmitButton text={`Create an AI ${pathname === "/" ? "Voice":"Chat"} Agent`} action={() => setOpen(true)}/>
            </div>
    </Flex>
  )
}

export default SelectAgent
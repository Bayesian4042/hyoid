import { Flex } from "antd"
import { useLocation } from "@remix-run/react"
import { RiVoiceAiLine } from "react-icons/ri";
import { RiChatAiLine } from "react-icons/ri";
import { LiaPhoneSolid } from "react-icons/lia";
import SubmitButton from "~/components/ui/SubmitButton";

const SelectAgent = ({setOpen}:{setOpen : (isOpenKnowledgeBase: boolean) => void} ) => {
 const {pathname} = useLocation()

  return (
    <Flex className="border-l-2 h-screen" justify="center" align="center" vertical>
      <div className="rounded-full p-10 border-2 bg-gray-50">
      {pathname === "/" ? <RiVoiceAiLine size={100}/>
          : pathname === "/chatagent" ? <RiChatAiLine size={100} />
          : <LiaPhoneSolid size={100}/>
          }
      </div>
            <h1 className="font-semibold text-base mt-3">No {pathname === "/" ? "Voice Agent": pathname === "/chatagent" ? "Chat Agent": "phone number"} Selected</h1>
            <p className="w-[63%] mt-2 text-center text-sm">Select an existing {pathname === "/" ? "Voice agent": pathname === "/chatagent" ? "Chat agent":"existing phone number"}   or  {pathname === "/" ? "create a new one to test your Voice AI.": pathname === "/chatagent" ? "create a new one to test your Chat AI.":"import a new one."}  </p>
            <div className="mt-32 w-full text-center">
            <SubmitButton text={`${pathname === "/" ? "Create an AI Voice Agent": pathname === "/chatagent" ? "Create an AI Chat Agent":"Import a phone number"} `} action={() => setOpen(true)}/>
            </div>
    </Flex>
  )
}

export default SelectAgent
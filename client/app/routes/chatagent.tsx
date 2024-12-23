import { Flex } from "antd";
import { useState } from "react";
import AddAgentDrawer from "~/components/AddAgentDrawer";
import HeaderWithAgent from "~/components/HeaderWithAgent";
import SelectAgent from "~/components/SelectAgent";


export default function ChatAgent() {
  const[open,setOpen] = useState<boolean>(false)
  return (
    <Flex>
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Chat Agents' buttons={["Playground", "+"]} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent setOpen={setOpen}/>
      </div>
    <AddAgentDrawer open={open} setOpen={setOpen} title="Chat"/>
    </Flex>
  );
}

import { Flex } from "antd";
import { useState } from "react";
import AddAgentDrawer from "~/components/layouts/drawer/AddAgentDrawer";
import SelectAgent from "~/components/layouts/agent/SelectAgent";
import HeaderWithAgent from "~/components/layouts/header/HeaderWithAgent";


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

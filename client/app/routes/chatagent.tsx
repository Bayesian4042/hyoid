import { Flex } from "antd";
import { useState } from "react";
import AddAgentDrawer from "~/components/layouts/drawer/AddAgentDrawer";
import SelectAgent from "~/components/layouts/agent/SelectAgent";
import HeaderWithAgent from "~/components/layouts/header/HeaderWithAgent";
import { getAllAgents } from "~/common/apis/api.request";


export default function ChatAgent() {
  const[open,setOpen] = useState<boolean>(false)
  const buttons = [
    { 
      title: "playground", 
      action: () => console.log("Playground button clicked!") 
    },
    { 
      title: "+", 
      action: () => setOpen(true)
    }
  ];
  return (
    <Flex>
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Chat Agents' buttons={buttons} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent setOpen={setOpen}/>
      </div>
    <AddAgentDrawer open={open} setOpen={setOpen} title="Chat"/>
    </Flex>
  );
}



export async function loader() {
  const res = await getAllAgents("chat");
  return res;
}
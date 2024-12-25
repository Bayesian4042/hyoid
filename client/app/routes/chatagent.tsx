import { Flex } from "antd";
import { useEffect, useState } from "react";
import AddAgentDrawer from "~/components/layouts/drawer/AddAgentDrawer";
import SelectAgent from "~/components/layouts/agent/SelectAgent";
import HeaderWithAgent from "~/components/layouts/header/HeaderWithAgent";
import { getAllAgents } from "~/common/apis/api.request";
import { useLoaderData } from "@remix-run/react";


export default function ChatAgent() {
  const[open,setOpen] = useState<boolean>(false)

  const [agentId, setAgentId] = useState<string | null>(null);
  const [agents,setAgents] = useState()
  const allagents = useLoaderData()  
    
    
    
    useEffect(() => {
      if (allagents) {
        setAgents(allagents); 
      }
    }, [allagents]);
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
        <HeaderWithAgent title='Chat Agents' buttons={buttons} setAgentId={setAgentId} agents={agents} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent setOpen={setOpen}/>
      </div>
    <AddAgentDrawer setAgents={setAgents} open={open} setOpen={setOpen} title="Chat"/>
    </Flex>
  );
}



export async function loader() {
  const res = await getAllAgents("chat");
  return res;
}
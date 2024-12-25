import type { MetaFunction } from "@remix-run/node";
import { Flex } from "antd";
import HeaderWithAgent from "~/components/layouts/header/HeaderWithAgent";
import { useEffect, useState } from "react";
import AddAgentDrawer from "~/components/layouts/drawer/AddAgentDrawer";
import ConfigureAgent from "~/components/layouts/agent/ConfigureAgent";
import SelectAgent from "~/components/layouts/agent/SelectAgent";
import { getAllAgents } from "~/common/apis/api.request";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Voice-Workflow" },
    { name: "description", content: "Welcome to Voice-Workflow" },
  ];
};




export default function Index() {
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
    <Flex >
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Voice Agent' buttons={buttons} setAgentId={setAgentId} agents={agents} />
      </div>
      <div className="flex-[0.65]">
        {
        agentId ?
      <ConfigureAgent agentId={agentId}/> :
      <SelectAgent setOpen={setOpen}/>
        }
      </div>
      <AddAgentDrawer setAgents={setAgents} setOpen={setOpen} open={open} title="Voice"/>
    </Flex>
  );
}


export async function loader() {
  const res = await getAllAgents("voice");
  return res;
}
import { Flex } from "antd";
import { useEffect, useState } from "react";
import AddAgentDrawer from "~/components/layouts/drawer/AddAgentDrawer";
import SelectAgent from "~/components/layouts/agent/SelectAgent";
import HeaderWithAgent from "~/components/layouts/header/HeaderWithAgent";
import { getAllAgents } from "~/common/apis/api.request";
import { useLoaderData } from "@remix-run/react";
import { Agent } from "~/types/agents";
import ConfigureAgent from "~/components/layouts/agent/configure/ConfigureAgent";
import { IoMdAdd } from "react-icons/io";
import toggleStore from "~/lib/zustand/toggleStore";


export default function ChatAgent() {
  const[open,setOpen] = useState<boolean>(false)

  const [agentId, setAgentId] = useState<string | null>(null);
  const [agents,setAgents] = useState<Agent[]>()
  const allagents = useLoaderData<Agent[]>()  
  const { showSidebar } = toggleStore();
 
    
    
    
    useEffect(() => {
      if (allagents) {
        setAgents(allagents); 
      }
    }, [allagents]);
  const buttons = [
    { 
      icon: <IoMdAdd/>, 
      action: () => setOpen(true)
    }
  ];
  return (
    <Flex>
      <div className={`flex-[${showSidebar ?"0.30":"0.25"}]`}>
        <HeaderWithAgent title='Chat Agents' buttons={buttons} setAgentId={setAgentId} agents={agents} />
      </div>
      <div className={`flex-[${showSidebar ?"0.70":"0.75"}]`}>
        {
          agentId ? <ConfigureAgent agentId={agentId}/> :
        <SelectAgent setOpen={setOpen}/>
        }
      </div>
    <AddAgentDrawer setAgents={setAgents} open={open} setOpen={setOpen} title="Chat"/>
    </Flex>
  );
}



export async function loader() {
  const res = await getAllAgents("chat");
  return res;
}
import { Button, Flex, Spin } from "antd"
import { Fragment, useEffect, useState } from "react";
import VoiceOptions from "./voiceagent/VoiceOptions";
import AgentOptions from "./voiceagent/AgentOptions";
import { LoadingOutlined } from '@ant-design/icons';
import { getAgent } from "~/common/apis/api.request";
import { Agent } from "~/types/agents";
import { useLocation } from "@remix-run/react";
import EmojiAvatar from "~/components/ui/EmojiAvatar";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate } from "@remix-run/react";

const ConfigureAgent = ({agentId}:any) => {
  const{pathname} = useLocation()
  const [selectedOption, setSelectedOption] = useState<string>("Agent");
  const [loading,setLoading] = useState<boolean>(true)
  const [agentData,setAgentData]= useState<Agent>();
  const navigate = useNavigate()


  const fetchData = async() => {
    setLoading(true);
    const response = await getAgent(agentId);
    if(response)
    {
      setAgentData(response);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  },[agentId])


  return (
    <Fragment>
        {loading ? <Flex className="h-screen border-l-[1px]" justify="center" align="center">
      <Spin indicator={<LoadingOutlined spin />}size="large"/>
      </Flex> : 
    <div className="relative border-l-2 h-screen px-3 pt-4 overflow-y-scroll" style={{scrollbarWidth:"thin"}}>
      <Flex justify="space-between" align="center" className="px-1">
        <Flex gap='small'>
         <EmojiAvatar pathname={pathname}/>         
          <div>
          <h1 className="font-semibold">
           {agentData?.name}
          </h1>
          <h6 className="text-gray-500">
            {agentData?.id}
          </h6>
          </div>
        </Flex>
          <Button className="pt-1 rounded-full font-semibold" icon={<CiPlay1 size={20} />} onClick={() =>navigate(`${pathname === "/"?"/" : /chatagent/}${agentData?.id}`)}>Run</Button>
      </Flex>

      {selectedOption === "Voice" ? (
            <VoiceOptions />
          )  : (
            agentData && <AgentOptions agentData={agentData} />
          )}

    </div>
    }
    </Fragment>

  )
}

export default ConfigureAgent
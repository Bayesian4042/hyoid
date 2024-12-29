import { Button, Flex, Space, Spin, Typography } from "antd"
import { Fragment, useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import VoiceOptions from "./voiceagent/VoiceOptions";
import AgentOptions from "./voiceagent/AgentOptions";
import { LoadingOutlined } from '@ant-design/icons';
import { getAgent } from "~/common/apis/api.request";
import { Agent } from "~/types/agents";
import { useLocation } from "@remix-run/react";
import TestChat from "./chatagent/TestChat";
import EmojiAvatar from "~/components/ui/EmojiAvatar";
import SelectorOption from "~/components/ui/SelectorOption";

const ConfigureAgent = ({agentId}:any) => {
  const{pathname} = useLocation()
  const [options, setOptions] = useState<string[]>(["Agent", pathname === "/"?"Voice":"Test"]);
  const [selectedOption, setSelectedOption] = useState<string>("Agent");
  const [loading,setLoading] = useState<boolean>(true)
  const [agentData,setAgentData]= useState<Agent>();

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
          <Button className="pt-1 rounded-full" icon={<HiMenuAlt4 size={20} />}></Button>
      </Flex>
      
    <div className="mt-5">
      <SelectorOption options={options} setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
    </div>

      {selectedOption === "Voice" ? (
            <VoiceOptions />
          ) : selectedOption === "Test" ? (
            <TestChat agentId={(agentData?.id )? agentData?.id : ""}/>
          ) : (
            agentData && <AgentOptions agentData={agentData} />
          )}

    </div>
    }
    </Fragment>

  )
}

export default ConfigureAgent
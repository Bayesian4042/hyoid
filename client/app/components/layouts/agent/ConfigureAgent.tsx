import { Button, Flex, Space, Spin, Typography } from "antd"
import { Fragment, useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import VoiceOptions from "./voiceagent/VoiceOptions";
import AgentOptions from "./voiceagent/AgentOptions";
import { LoadingOutlined } from '@ant-design/icons';
import { getAgent } from "~/common/apis/api.request";
import { Agent } from "~/types/agents";
import { useLocation } from "@remix-run/react";
import TestChat from "./chatagent/TestChat";

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
    <div className="relative border-l-[1px] h-screen px-3 pt-4 overflow-y-scroll">
      <Flex justify="space-between" className="px-1">
        <div>
          <h1 className="font-semibold">
           {agentData?.name}
          </h1>
          <h6 className="text-gray-500">
            {agentData?.id}
          </h6>
        </div>
        <Space>
          <Button color="default" variant="solid">
            Test AI agent
          </Button>
          <Button icon={<FiLink />}></Button>
          <Button icon={<SlOptions />}></Button>
        </Space>
      </Flex>
      <Space className="relative w-full mt-2">
        <div className="absolute bottom-0 w-full border-b-[1px] ml-2"></div>
        {options.map((option: string) => (
          <h3
            key={option}
            className={`relative z-10 cursor-pointer py-2 text-sm ${selectedOption === option ? 'border-b-[1px] border-black  text-black' : 'border-b-[1px] border-transparent text-gray-500'
              }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </h3>
        ))}
      </Space>

      {selectedOption === "Voice" ? (
            <VoiceOptions />
          ) : selectedOption === "Test" ? (
            <TestChat />
          ) : (
            agentData && <AgentOptions agentData={agentData} />
          )}

    </div>
    }
    </Fragment>

  )
}

export default ConfigureAgent
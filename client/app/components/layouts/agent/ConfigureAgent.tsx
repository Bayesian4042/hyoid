import { Button, Flex, Space, Typography } from "antd"
import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import VoiceOptions from "./voiceagent/VoiceOptions";
import AgentOptions from "./voiceagent/AgentOptions";

const ConfigureAgent = () => {
  const [options, setOptions] = useState<string[]>(["Agent", "Voice"]);
  const [selectedOption, setSelectedOption] = useState<string>("Agent");
  return (
    <div className="border-l-[1px] h-screen px-3 py-4 overflow-y-scroll">
      <Flex justify="space-between" className="px-1">
        <div>
          <h1 className="font-semibold">
            Agent Name
          </h1>
          <h6 className="text-gray-500">
            asdf1234
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

      {
        selectedOption === 'Voice' ? <VoiceOptions /> : <AgentOptions/>
      }

    </div>
  )
}

export default ConfigureAgent
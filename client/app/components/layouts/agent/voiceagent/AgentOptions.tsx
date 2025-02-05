import { Button, Divider, Flex, Space, Tabs, TabsProps } from 'antd'
import { useEffect, useState, useCallback } from 'react'
import { updateAgent } from '~/common/apis/api.request'
import { IoWarningOutline } from "react-icons/io5"
import { useLocation } from '@remix-run/react'
import { Agent } from '~/types/agents'
import { Flag } from '~/types/common'

import InputField from '~/components/ui/InputField'
import OpenModalButton from '~/components/ui/OpenModalButton'
import OptionSelector from '~/components/ui/OptionSelector'
import Slider from '~/components/ui/Slider'
import NumberInput from '~/components/ui/NumberInput'

import KnowledgeBaseDrawer from '../../drawer/KnowledgeBaseDrawer'
import ToolsDrawer from '../../drawer/ToolsDrawer'
import TwitterScrapperDrawer from '../../drawer/TwitterScrapperDrawer'

const AgentOptions = ({ agentData }: { agentData: Agent }) => {
    const [isOpenKnowledgeBase, setIsOpenKnowledgeBase] = useState(false)
    const [isOpenTools, setIsOpenTools] = useState(false)
    const [isOpenTwitter, setIsOpenTwitter] = useState(false)

    const [contactNumber, setContactNumber] = useState<number | null>(null)
    const [firstMessage, setFirstMessage] = useState(agentData?.firstMessage)
    const [systemPrompt, setSystemPrompt] = useState(agentData?.systemPrompt)
    const [temperature, setTemperature] = useState(agentData?.temperature)

    const hasUnsavedChanges = 
        firstMessage !== agentData?.firstMessage || 
        systemPrompt !== agentData?.systemPrompt || 
        temperature !== agentData?.temperature

    const [loading, setLoading] = useState(false)

    const handleUpdateAgent = useCallback(async () => {
        setLoading(true)
        await updateAgent(agentData.id, firstMessage, systemPrompt, temperature)
        setLoading(false)
    }, [agentData.id, firstMessage, systemPrompt, temperature])

    const items: TabsProps['items'] = [
        { key: '1', label: 'Configure', children:  <ConfigureAgent
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            firstMessage={firstMessage}
            setFirstMessage={setFirstMessage}
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            temperature={temperature}
            setTemperature={setTemperature}
            hasUnsavedChanges={hasUnsavedChanges}
            handleUpdateAgent={handleUpdateAgent}
            loading={loading}
            setIsOpenKnowledgeBase={setIsOpenKnowledgeBase}
            setIsOpenTools={setIsOpenTools}
            setIsOpenTwitter={setIsOpenTwitter}
        /> },
        { key: '2', label: 'Widget', children: <ConfigureWidget/> },
    ]

    return (
        <div>
            <Tabs className='mx-4 mt-1' defaultActiveKey="1" items={items} />
            <KnowledgeBaseDrawer agentId={agentData.id} open={isOpenKnowledgeBase} setOpen={setIsOpenKnowledgeBase} />
            <ToolsDrawer open={isOpenTools} setOpen={setIsOpenTools} />
            <TwitterScrapperDrawer open={isOpenTwitter} setOpen={setIsOpenTwitter} />
        </div>
    )
}

const ConfigureAgent = ({
    contactNumber,
    setContactNumber,
    firstMessage,
    setFirstMessage,
    systemPrompt,
    setSystemPrompt,
    temperature,
    setTemperature,
    hasUnsavedChanges,
    handleUpdateAgent,
    loading,
    setIsOpenKnowledgeBase,
    setIsOpenTools,
    setIsOpenTwitter,
}:any) => {
    const { pathname } = useLocation()

    return (
        <Space size="middle" direction="vertical" className="px-1 my-5 h-full w-full">
            <OptionSelector title="Agent Language" desc="Choose the language the agent will communicate in." defaultValue="English" />

            {pathname === "/" && (
                <>
                    <Divider style={{ borderWidth: '1px' }} />
                    <NumberInput value={contactNumber} setValue={setContactNumber} title="Phone number" row={1} desc="The Contact Number used for voice again." />
                </>
            )}

            <Divider style={{ borderWidth: '1px' }} />
            <InputField value={firstMessage} setValue={setFirstMessage} title="First message" row={3} desc="The first message the agent will say. If empty, the agent will wait for the user to start the conversation." />

            <Divider style={{ borderWidth: '1px' }} />
            <InputField value={systemPrompt} setValue={setSystemPrompt} title="System prompt" row={4} desc="The system prompt is used to determine the persona of the agent and the context of the conversation." />

            <Divider style={{ borderWidth: '1px' }} />
            <OptionSelector title="LLM" desc="Select which provider and model to use for the LLM. Currently, the LLM cost is covered by us. In the future," defaultValue="GPT-4o Mini" />

            <Divider style={{ borderWidth: '1px' }} />
            <Slider value={temperature} setValue={setTemperature} title="Temperature" desc="Temperature is a parameter that controls the creativity or randomness of the responses generated by the LLM." />

            <Divider style={{ borderWidth: '1px' }} />
            <OpenModalButton title="Knowledge base" desc="Provide the LLM with domain-specific information to help it answer questions more accurately." button="Add item" setOpen={setIsOpenKnowledgeBase} />

            <Divider style={{ borderWidth: '1px' }} />
            <OpenModalButton title="Tools" desc="Provide the agent with tools it can use to help users." button="Add tool" setOpen={setIsOpenTools} />

            <Divider style={{ borderWidth: '1px' }} />
            <OpenModalButton title="Twitter Scraper" desc="Provide the agent with a Twitter Scraper for tweet insights." button="Get Twitter" setOpen={setIsOpenTwitter} />

            {hasUnsavedChanges && (
                <>
                    <Divider style={{ borderWidth: '1px' }} />
                    <Flex justify="space-between" align="center" className="bg-white border border-gray-300 py-3 px-4 w-full rounded-lg">
                        <Flex gap="small">
                            <IoWarningOutline size={21} />
                            <h1 className="text-sm font-medium">You have unsaved changes</h1>
                        </Flex>
                        <Button color="default" variant="solid" onClick={handleUpdateAgent} loading={loading}>
                            Save
                        </Button>
                    </Flex>
                </>
            )}
        </Space>
    )
}



const ConfigureWidget = () => {
    return(
        <div>
            <h1 className='font-semibold text-gray-900'>Embeded code</h1>
            <div className='px-3 py-2 bg-gray-100 rounded-md'>
                <div className='bg-white p-1 rounded-sm'>Coming soon...</div>
            </div>
        </div>
    )
}

export default AgentOptions

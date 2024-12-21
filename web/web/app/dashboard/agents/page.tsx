"use client"

import { useState } from "react"
import AgentList from "@/components/AgentList"
import AgentConfiguration from "@/components/AgentConfiguration"

interface Agent {
  id: number
  name: string
  phoneNumber: string
  description: string
  apiKey: string
  model: string
  temperature: string
  maxTokens: string
}

const mockAgents: Agent[] = [
  { id: 1, name: "Agent 1", phoneNumber: "123-456-7890", description: "First agent", apiKey: "key1", model: "gpt-3.5-turbo", temperature: "0.7", maxTokens: "2048" },
  { id: 2, name: "Agent 2", phoneNumber: "234-567-8901", description: "Second agent", apiKey: "key2", model: "gpt-4", temperature: "0.5", maxTokens: "4096" },
  { id: 3, name: "Agent 3", phoneNumber: "345-678-9012", description: "Third agent", apiKey: "key3", model: "gpt-3.5-turbo", temperature: "0.8", maxTokens: "2048" },
]

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleAgentCreate = (newAgent: Omit<Agent, "id">) => {
    const agentWithId = { ...newAgent, id: agents.length + 1 }
    setAgents([...agents, agentWithId])
  }

  const handleAgentUpdate = (updatedAgent: Agent) => {
    setAgents(agents.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent))
    setSelectedAgent(updatedAgent)
  }

  return (
    <div className="flex h-full m-4">
      <div className="w-1/3 pr-4 h-full overflow-y-auto">
        <AgentList
          agents={agents}
          selectedAgentId={selectedAgent?.id}
          onAgentSelect={handleAgentSelect}
          onAgentCreate={handleAgentCreate}
        />
      </div>
      <div className="w-3/4 h-full overflow-y-auto pl-4">
        <AgentConfiguration
          agent={selectedAgent}
          onAgentUpdate={handleAgentUpdate}
        />
      </div>
    </div>
  )
}

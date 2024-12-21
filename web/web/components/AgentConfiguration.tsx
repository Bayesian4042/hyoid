"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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

interface AgentConfigurationProps {
  agent: Agent | null
  onAgentUpdate: (updatedAgent: Agent) => void
}

export default function AgentConfiguration({ agent, onAgentUpdate }: AgentConfigurationProps) {
  const [config, setConfig] = useState<Agent>({
    id: 0,
    name: "",
    phoneNumber: "",
    description: "",
    apiKey: "",
    model: "",
    temperature: "",
    maxTokens: "",
  })

  useEffect(() => {
    if (agent) {
      setConfig(agent)
    }
  }, [agent])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAgentUpdate(config)
  }

  if (!agent) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Agent Configuration</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p className="text-muted-foreground">Select an agent to view or edit its configuration.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Agent Configuration</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={config.name}
                onChange={handleChange}
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={config.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Sytem Prompt</Label>
            <Textarea
              id="description"
              name="description"
              value={config.description}
              onChange={handleChange}
              placeholder="Enter agent description"
              className="h-32"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                value={config.apiKey}
                onChange={handleChange}
                type="password"
                placeholder="Enter API key"
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={config.model}
                onChange={handleChange}
                placeholder="e.g., gpt-3.5-turbo"
              />
            </div> */}
          </div>
        
          <Button type="submit" className="w-full">Save Configuration</Button>
        </form>
      </CardContent>
    </Card>
  )
}


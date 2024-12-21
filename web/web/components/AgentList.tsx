"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Agent {
  id: number
  name: string
  phoneNumber: string
}

interface AgentListProps {
  agents: Agent[]
  selectedAgentId: number | undefined
  onAgentSelect: (agent: Agent) => void
  onAgentCreate: (newAgent: Omit<Agent, "id">) => void
}

export default function AgentList({ agents, selectedAgentId, onAgentSelect, onAgentCreate }: AgentListProps) {
  const [newAgent, setNewAgent] = useState({ name: "", phoneNumber: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault()
    onAgentCreate(newAgent)
    setNewAgent({ name: "", phoneNumber: "" })
    setIsDialogOpen(false)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Agents</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add new agent</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="Enter agent name"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={newAgent.phoneNumber}
                  onChange={(e) => setNewAgent({ ...newAgent, phoneNumber: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <Button type="submit">Create Agent</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          {agents.map((agent) => (
            <Button
              key={agent.id}
              variant={selectedAgentId === agent.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onAgentSelect(agent)}
            >
              <div className="flex flex-col items-start">
                <span>{agent.name}</span>
                <span className="text-xs text-muted-foreground">{agent.phoneNumber}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


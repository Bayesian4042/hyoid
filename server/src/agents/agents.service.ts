import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AgentType } from "@prisma/client";

@Injectable()
export class AgentsService {
	constructor(private prismaService: PrismaService) {}
	async create(createAgentDto: { name: string; type: AgentType }) {
		const agent = await this.prismaService.agent.create({
			data: {
				name: createAgentDto.name,
				type: createAgentDto.type
			},
		});
		return agent;
	}

	async update(id: string, updateAgentDto: { systemPrompt?: string }) {
		return this.prismaService.agent.update({
			where: { id },
			data: updateAgentDto,
		});
	}

	async getAgent(id: string) {
		return this.prismaService.agent.findUnique({
			where: { id },
		});
	}

	async getAllAgents(type:AgentType){
		return this.prismaService.agent.findMany({where:{type}})
	}
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AgentsService {
	constructor(private prismaService: PrismaService) {}
	async create(createAgentDto: { name: string }) {
		const agent = await this.prismaService.agent.create({
			data: {
				name: createAgentDto.name,
				systemPrompt: "You are a helpful AI assistant.",
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
}

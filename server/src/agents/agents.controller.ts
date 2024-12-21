import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { ResponseUtil } from "src/common/utils/response.util";

@Controller("agents")
export class AgentsController {
	constructor(private readonly agentsService: AgentsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createAgent(
		@Body() createAgentDto: { name: string; phoneNumber: string },
	) {
		const newAgent = await this.agentsService.create(createAgentDto);
		return ResponseUtil.success(newAgent);
	}

	@Patch(":id")
	@HttpCode(HttpStatus.OK)
	async updateAgent(
		@Param("id") id: string,
		@Body() updateAgentDto: { systemPrompt?: string },
	) {
		const updatedAgent = this.agentsService.update(id, updateAgentDto);
		return ResponseUtil.success(updatedAgent);
	}

	@Get(":id")
	async getAgent(@Param("id") id: string) {
		const agent = await this.agentsService.getAgent(id);
		return ResponseUtil.success(agent);
	}
}

import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { ResponseUtil } from "src/common/utils/response.util";

@Controller("agents")
export class AgentsController {
	constructor(private readonly agentsService: AgentsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createAgent(@Body() createAgentDto: { name: string }) {
		const newAgent = this.agentsService.create(createAgentDto);
		return ResponseUtil.success(newAgent);
	}

	@Post(":id")
	@HttpCode(HttpStatus.OK)
	async updateAgent(
		@Param("id") id: string,
		@Body() updateAgentDto: { systemPrompt?: string },
	) {
		const updatedAgent = this.agentsService.update(id, updateAgentDto);
		return ResponseUtil.success(updatedAgent);
	}
}

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { ResponseUtil } from "src/common/utils/response.util";
import { CreateAgentDto, AgentType, UpdateAgentDto } from "./agents.dto";

@Controller("agents")
export class AgentsController {
	constructor(private readonly agentsService: AgentsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createAgent(@Body() createAgentDto: CreateAgentDto) {
		if (!["chat", "voice"].includes(createAgentDto.type)) {
			return ResponseUtil.error(
				"Please provide a valid type",
				403,
				"Valid type not provided.",
			);
		}

		if (!createAgentDto.name || createAgentDto.name.trim() === "") {
			return ResponseUtil.error(
				"Please provide a valid name",
				403,
				"Valid name not provided.",
			);
		}
		const newAgent = await this.agentsService.create(createAgentDto);
		return ResponseUtil.success(newAgent);
	}

	@Patch(":id")
	@HttpCode(HttpStatus.OK)
	async updateAgent(
		@Param("id") id: string,
		@Body() updateAgentDto: UpdateAgentDto,
	) {
		if (!updateAgentDto) {
			return ResponseUtil.error(
				"Please Provide valid id",
				403,
				"Valid id not provided.",
			);
		}
		if (!Object.keys(updateAgentDto).length) {
			return ResponseUtil.error(
				"Please Provide Values to be updated.",
				403,
				"Values not provided.",
			);
		}
		const updatedAgent = this.agentsService.update(id, updateAgentDto);
		return ResponseUtil.success(updatedAgent);
	}

	@Get(":id")
	async getAgent(@Param("id") id: string) {
		if (!id) {
			return ResponseUtil.error(
				"Please Provide valid id",
				403,
				"Valid id not provided.",
			);
		}
		const agent = await this.agentsService.getAgent(id);
		return ResponseUtil.success(agent);
	}

	@Get()
	async getAllAgents(@Query("type") type: AgentType) {
		if (!["chat", "voice"].includes(type)) {
			return ResponseUtil.error(
				"Please Provide valid Type",
				403,
				"Valid type not provided.",
			);
		}
		const agents = await this.agentsService.getAllAgents(type);
		return ResponseUtil.success(agents);
	}
}

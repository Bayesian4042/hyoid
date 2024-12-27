import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from "@nestjs/common";
import { LlmToolsService } from "./llm-tools.service";
import { CreateToolDto } from "./dto/create-tool.dto";

@Controller("llm-tools")
export class LlmToolsController {
	constructor(private readonly llmToolsService: LlmToolsService) {}

	@Post("")
	async createTool(@Body() createToolDto: CreateToolDto) {
		try {
			const tool = await this.llmToolsService.createTool(createToolDto);
			return {
				success: true,
				message: "Tool created successfully",
				tool,
			};
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: "Error creating tool",
					message: error.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

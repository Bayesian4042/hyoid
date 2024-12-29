import { Injectable } from "@nestjs/common";
import { CreateToolDto } from "./dto/create-tool.dto";

@Injectable()
export class LlmToolsService {
	async createTool(createToolDto: CreateToolDto) {
		try {
		} catch (error) {
			throw new Error("Method not implemented.");
		}
	}
}

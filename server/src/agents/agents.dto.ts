import {
	IsString,
	IsEnum,
	IsOptional,
	IsNotEmpty,
	IsNumber,
} from "class-validator";

export enum AgentType {
	VOICE = "voice",
	CHAT = "chat",
}

export enum LLMType {
	OPENAI = "openai",
	AZURE = "azure",
}

export class CreateAgentDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEnum(AgentType)
	type: AgentType;
}

export class UpdateAgentDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	systemPrompt?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	firstMessage?: string;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	temperature?: number;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string;

	@IsEnum(LLMType)
	@IsOptional()
	llm?: LLMType;
}

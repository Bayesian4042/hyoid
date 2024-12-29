import { IsNotEmpty, IsString } from "class-validator";

export class CreateToolDto {
	@IsString()
	@IsNotEmpty()
	agentId: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	method: string;

	@IsString()
	@IsNotEmpty()
	url: string;

	headers: HeadersDto[];
	queryParams: QueryParamDto[];
}

class HeadersDto {
	@IsString()
	@IsNotEmpty()
	key: string;

	@IsString()
	@IsNotEmpty()
	value: string;
}

class QueryParamDto {
	@IsString()
	dataType: string;

	@IsString()
	value: string;

	@IsString()
	description: string;
}

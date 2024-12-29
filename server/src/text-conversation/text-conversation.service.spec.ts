import { Test, TestingModule } from "@nestjs/testing";
import { TextConversationService } from "./text-conversation.service";

describe("TextConversationService", () => {
	let service: TextConversationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TextConversationService],
		}).compile();

		service = module.get<TextConversationService>(TextConversationService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});

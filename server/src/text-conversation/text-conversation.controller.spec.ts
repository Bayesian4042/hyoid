import { Test, TestingModule } from "@nestjs/testing";
import { TextConversationController } from "./text-conversation.controller";
import { TextConversationService } from "./text-conversation.service";

describe("TextConversationController", () => {
	let controller: TextConversationController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TextConversationController],
			providers: [TextConversationService],
		}).compile();

		controller = module.get<TextConversationController>(
			TextConversationController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});

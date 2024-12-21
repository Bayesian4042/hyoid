import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { TwilioModule } from "./twilio/twilio.module";
import { AgentsService } from "./agents/agents.service";
import { AgentsController } from "./agents/agents.controller";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	imports: [
		LoggerModule.forRootAsync({
			imports: [ConfigModule, TwilioModule],
			useFactory: (ConfigService: ConfigService) => {
				const isProduction =
					ConfigService.get("NODE_ENV") === "production";
				return {
					pinoHttp: {
						transport: isProduction
							? undefined
							: {
									target: "pino-pretty",
									options: {
										singleLine: true,
									},
								},
						level: isProduction ? "info" : "debug",
					},
				};
			},
			inject: [ConfigService],
		}),
		PrismaModule,
		ConfigModule.forRoot(),
	],
	controllers: [AppController, AgentsController],
	providers: [AppService, AgentsService, PrismaService],
})
export class AppModule {}

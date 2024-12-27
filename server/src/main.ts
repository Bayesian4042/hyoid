import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "nestjs-pino";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { WsAdapter } from "@nestjs/platform-ws";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useLogger(app.get(Logger));
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.enableCors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PATCH",
	});

	// const config = new DocumentBuilder()
	// 	.setTitle("NestJS API")
	// 	.setDescription("API for NestJS")
	// 	.setVersion("1.0")
	// 	.addTag("API")
	// 	.addBearerAuth()
	// 	.build();

	// const document = SwaggerModule.createDocument(app, config);
	// SwaggerModule.setup("api", app, document);
	// // Write the Swagger spec to a file
	// writeFileSync("./swagger-spec.json", JSON.stringify(document));
	app.useWebSocketAdapter(new WsAdapter(app));
	await app.listen(app.get(ConfigService).getOrThrow("PORT"));
}

bootstrap();

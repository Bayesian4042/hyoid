import { Injectable } from "@nestjs/common";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

@Injectable()
export class RagService {
	private pinecone: Pinecone;
	private openaiClient: OpenAI;

	constructor() {
		this.pinecone = new Pinecone({
			apiKey: process.env.PINECONE_API_KEY,
		});

		this.openaiClient = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}

	async processText(text: string, agentId: string): Promise<void> {
		try {
			const chunks = this.splitTextIntoChunks(text, 1000);

			const embeddings = await Promise.all(
				chunks.map(async (chunk, index) => {
					const response = await this.openaiClient.embeddings.create({
						model: "text-embedding-3-small",
						input: chunk,
					});

					return {
						id: `${agentId}`,
						values: response.data[0].embedding,
						metadata: {
							agentId,
							text: chunk,
							position: index,
							timestamp: new Date().toISOString(),
						},
					};
				}),
			);

			await this.pinecone.createIndex({
				name: process.env.PINECONE_INDEX,
				dimension: 1536,
				metric: "cosine",
				spec: {
					serverless: {
						cloud: "aws",
						region: "us-east-1",
					},
				},
			});

			const index = this.pinecone.index(process.env.PINECONE_INDEX);

			await index.namespace(agentId).upsert(embeddings);
		} catch (error) {
			console.error("Error processing text:", error);
			throw error;
		}
	}

	private splitTextIntoChunks(text: string, chunkSize: number): string[] {
		const chunks: string[] = [];
		const sentences = text.split(/[.!?]+/);
		let currentChunk = "";

		for (const sentence of sentences) {
			if (currentChunk.length + sentence.length > chunkSize) {
				chunks.push(currentChunk.trim());
				currentChunk = "";
			}
			currentChunk += sentence + ". ";
		}

		if (currentChunk) {
			chunks.push(currentChunk.trim());
		}

		return chunks;
	}

	async searchSimilarText(
		query: string,
		agentId: string,
		limit: number = 5,
	): Promise<any> {
		try {
			const response = await this.openaiClient.embeddings.create({
				model: "text-embedding-3-small",
				input: query,
			});

			const queryEmbedding = response.data[0].embedding;

			const index = this.pinecone.index(process.env.PINECONE_INDEX);

			const queryResponse = await index.namespace(agentId).query({
				vector: queryEmbedding,
				topK: limit,
				includeValues: true,
				includeMetadata: true,
			});

			const relevantContext = queryResponse.matches
				.filter((match: any) => match.metadata.score > 0.6)
				.map((match: any) => match.metadata.text)
				.join("\n");

			return relevantContext;
		} catch (error) {
			console.error("Error searching similar text:", error);
			throw error;
		}
	}
}

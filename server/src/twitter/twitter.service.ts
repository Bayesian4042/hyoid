import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import { ActorRun, ApifyClient } from 'apify-client';
import { OpenAIWrapper } from "src/modules/openai/openai.service";
dotenv.config();

interface InputData {
    username: string;
    max_posts: number;
}

@Injectable()
export class TwitterService {
    private client: ApifyClient;
    private input: InputData;
    private tweets:Record<string | number, unknown>[];
    private allTwitts :string
    
    constructor(
        private readonly openAiService: OpenAIWrapper
    ) {
        const apiKey = process.env.APIFY_API_KEY;
        if (!apiKey) {
            throw new Error("Apify API key is required. Set it in environment.");
        }
        this.client = new ApifyClient({ token: apiKey });
        this.input = { username: "", max_posts: 20 };
    }

    async getTweets<T>(username: string){
        if (username) {
            this.input.username = username;
        }

        try {
            const run: ActorRun = await this.client.actor("SfyC2ifoAKkAUvjTt").call(this.input);
            const {items} = await this.client.dataset(run.defaultDatasetId).listItems();
            if(items)
            {
                this.tweets = items;
            }

        this.allTwitts = this.tweets.map(tweet => tweet.text).join('\n');

        const response = await this.openAiService.generateResponse(this.allTwitts,"Can you summerize all twiits in bullet points")

        console.log(response)

        } catch (error) {
            console.error("Error fetching tweets:", error);
            throw new Error("Failed to fetch tweets.");
        }
    }

}

# Voice Agent

This is an end to end worflow for voice agent -> speech to text[deepgram] and text conversation [llama] and text to speech [deepgram]

# Project Setup

1. This project has backend in nestjs framework in server folder.

## How to run the project
1. Go to server folder
2. run command: pnpm install
3. run command: pnpm start:dev
4. whenever you call the twilio number with webhook as api https://{domain}/conversations/incoming-call
5. you should be able to converse.

## for domain
1. run ngrok http 8000
2. this will give a domain url, which you can use

# Configure twilio
1. Go to **console.twilio.com**
2. Go to Active number
3. Click on configure
4. Add voice webhook with api https://{domain}/conversations/incoming-call

# ChatBots
1. To reflect the longer conversation history:
    ```
    [
        {"role": "system", "content": "system message here"},
        {"role": "user", "content": "first user prompt here"},
        {"role": "assitant", "content": "the assitant response"},
        {"role": "user", "content": "the new user prompt"}
    ]
    ```
# Voice Agent

This is an end to end worflow for voice agent -> speech to text[deepgram] and text conversation [llama] and text to speech [deepgram]

# Project Setup

1. This project has backend in nestjs framework in server folder.

## How to run the project
1. Go to server folder
2. run command: pnpm install
3. run command: pnpm start:dev
4. whenever you call the twilio number with webhook as api https://{domain}/conversations/incoming-call

## To Configure Twilio
1. Go to console.twilio.com
2. Go to Active Number and click on it [one number is available in free version]
3. Add voice hook with  https://{domain}/conversations/incoming-call


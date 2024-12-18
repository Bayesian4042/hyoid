export default () => ({
  deepgramApiKey: process.env.DEEPGRAM_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  wsUrl: process.env.DEV_WS_URL,
  welcomeMessage: "Hello, how are you today. Can I take your order please.",
});
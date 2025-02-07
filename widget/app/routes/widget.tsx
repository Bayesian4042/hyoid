import { useSearchParams } from "@remix-run/react";

export default function Widget() {
  const [searchParams] = useSearchParams();
  const chatbotId = searchParams.get("chatbot-id") || "default-id";

  return (
    <iframe
      src={`/chat?chatbot-id=${chatbotId}`}
      width="100%"
      height="100%"
      style={{
        border: "none",
        display: "block",
        height: "100vh",
        width:"100%",
        borderRadius:"10px"
      }}
    />
  );
}

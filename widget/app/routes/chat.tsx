import { Flex, Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { RiChatAiLine } from "react-icons/ri";
import { WebSocketService, webSocketService } from "~/common/webhook/websocket";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSearchParams } from "@remix-run/react";

export default function Index() {
    const [inputData, setInputData] = useState("");
    const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const socketRef = useRef<WebSocketService | null>(null);
    const [searchParams] = useSearchParams();
    const chatbotId = searchParams.get("chatbot-id");
  
    useEffect(() => {
      if (chatbotId) {
        const socket = webSocketService("ws://localhost:8000/test");
        socket.connect();
        socketRef.current = socket;
  
        socket.onMessage((message) => {
          if (message) {
            setLoading(false);
          }
          const parsedMessage = JSON.parse(message);
          const data = parsedMessage?.value?.content;
          if (typeof data !== "string") {
            console.error("Invalid content in message:", parsedMessage);
          }
          setMessages((prev) => [...prev, { user: "Agent", message: data }]);
        });
  
        return () => {
          socket.disconnect();
        };
      }
    }, [chatbotId]); // Reconnect if chatbot ID changes
  
    const handleSend = () => {
      if (inputData.trim() === "") return;
      setMessages((prev) => [...prev, { user: "User", message: inputData }]);
      setLoading(true);
      if (inputData.trim()) {
        socketRef.current?.sendMessage({ message: inputData, agentId: chatbotId });
        setInputData("");
      }
    };
  
    return (
      <Flex justify="space-between" vertical className="h-screen w-full px-2 py-2 bg-gray-100">
        {!messages.length ? (
          <Flex justify="center" vertical align="center" className="h-full">
            <div className="rounded-full p-4 border-2 bg-gray-50">
              <RiChatAiLine size={40} />
            </div>
            <div className="text-lg font-semibold mt-5">What can I help with?</div>
          </Flex>
        ) : (
          <Flex vertical className="h-[78%] overflow-y-auto px-10 mt-10" style={{scrollbarWidth:"thin"}}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-3 py-2 my-2 rounded-lg ${
                  msg.user === "User"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.message}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="self-start">
                <Spin size="default" />
              </div>
            )}
          </Flex>
        )}
  
        <Flex align="center" className="border-2 py-2 rounded-lg px-2  mb-2 w-full">
          <Input
            className="border-none focus:outline-none focus:ring-0 bg-gray-100 focus:bg-gray-100"
            placeholder="Test Your Agent.."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="cursor-pointer bg-gray-100 px-1.5 py-1.5 rounded-md border-[1px]" onClick={handleSend}>
            <LuSend />
          </div>
        </Flex>
      </Flex>
    );
  }

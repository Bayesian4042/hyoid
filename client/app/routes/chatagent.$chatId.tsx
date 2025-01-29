import { Flex, Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { RiChatAiLine } from "react-icons/ri";
import { WebSocketService, webSocketService } from "~/common/webhook/websocket";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChat } from "~/common/apis/api.request";

export default function ChatAgent() {
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const socketRef = useRef<WebSocketService | null>(null);
  const [chatData, setChatData] = useState<any>();

  const startChat = async () => {
    try {
      const data = await getChat();
      setChatData(data);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    if (!chatData) {
      startChat();
    }
  }, [chatData]);

  useEffect(() => {
    if (chatData?.wsEndpoint) {
      const socket = webSocketService(chatData.wsEndpoint);
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
  }, [chatData]);

  const handleSend = () => {
    if (inputData.trim() === "") return;
    setMessages((prev) => [...prev, { user: "User", message: inputData }]);
    setLoading(true);
    if (inputData.trim()) {
      socketRef.current?.sendMessage({ message: inputData, agentId: "676beea95499565fe48594c5" });
      setInputData("");
    }
  };

  return (
    <Flex justify="space-between" vertical className="h-screen px-2 py-2">
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
              className={`p-3 my-2 rounded-lg ${
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

      <Flex align="center" className="border-2 py-2 rounded-lg px-2 mx-36 mb-5">
        <Input
          className="border-none"
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
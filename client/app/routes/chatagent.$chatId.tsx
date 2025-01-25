import { Flex, Input } from "antd";
import { useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { RiChatAiLine } from "react-icons/ri";
import { WebSocketService, webSocketService } from "~/common/webhook/websocket";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ChatAgent() {
  const [message, setMessage] = useState("");
  const socketRef = useRef<WebSocketService | null>(null);

  const handleSend = () => {}
  return (
    <Flex justify="space-between" vertical className="h-screen px-2 py-2">
     <Flex justify="center" vertical align="center" className="h-full">
           <div className="rounded-full p-4 border-2 bg-gray-50">
              <RiChatAiLine size={40} />
            </div>
            <div className="text-lg font-semibold mt-5">What can I help with?</div>
     </Flex>
     <Flex  align="center" className="border-2 py-2 rounded-lg px-2 mx-36 mb-5">
      <Input className="border-none focus:outline-none" placeholder="Test Your Agent.."   value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}/>
      <div className="cursor-pointer bg-gray-100 px-1.5 py-1.5 rounded-md border-[1px]" onClick={handleSend}><LuSend/></div>
    </Flex>
    </Flex>
  );
}

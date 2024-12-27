import { Avatar, Button, Flex, Input, Space, Typography } from "antd";
import { useState, useEffect, useRef } from "react";
import { getChat } from "~/common/apis/api.request";
import { WebSocketService, webSocketService } from "~/common/webhook/websocket";
import { ChatAgent } from "~/types/agents";

const TestChat = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [inputData, setInputData] = useState<{ user: string; message: string }[]>([]);
  const socketRef = useRef<WebSocketService | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatAgent>(); 

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
        setInputData((prev) => [...prev, { user: "Agent", message: data }]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [chatData]);

  const handleClick = () => {
    setInputData((prev) => [...prev, { user: "User", message: userInput }]);
    setLoading(true);
    if (userInput.trim()) {
      socketRef.current?.sendMessage({ message: userInput, agentId: "123456" });
      setUserInput("");
    }
  };

  return (
    <Flex vertical justify="space-between" gap={30} className="mt-5 h-[calc(100vh-149px)] rounded-lg">
      <Flex vertical gap="large">
        {inputData.length ? (
          inputData.map((msg, index) => (
            <Message key={index} user={msg.user} message={msg.message} />
          ))
        ) : (
          <Flex justify="center" align="center" className="h-96">
            <div className="text-gray-500 text-xl">Enter your message to text chat with the agent...</div>
          </Flex>
        )}
      </Flex>
      <Space.Compact style={{ width: "100%" }} className="pb-5">
        <Input
          className="py-2"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button color="default" variant="solid" disabled={loading} className="h-10" onClick={handleClick}>
          {loading ? "Sending..." : "Submit"}
        </Button>
      </Space.Compact>
    </Flex>
  );
};

const Message = ({ user, message }: { user: string; message: string }) => {
  return (
    <Flex vertical gap={3}>
      <Flex gap="small">
        <Avatar>{user[0]}</Avatar>
        <div className="font-bold text-xl text-gray-500">{user}</div>
      </Flex>
      <Typography.Text>{message}</Typography.Text>
    </Flex>
  );
};

export default TestChat;

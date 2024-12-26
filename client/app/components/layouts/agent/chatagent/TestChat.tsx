import { Avatar, Button, Flex, Input, Space, Typography } from "antd"
import { useState } from "react"

const TestChat = () => {
  const [userInput, setUserInput] = useState("")
  const [inputData, setInputData] = useState<{ user: string, message: string }[]>([])

  const handleClick = () => {
    if (userInput.trim()) {
      setInputData((prevInputData) => [...prevInputData, { user: "User", message: userInput }])

      setTimeout(() => {
        const agentMessage = `Hello, How can i help you?`;  
        setInputData((prevInputData) => [...prevInputData, { user: "Agent", message: agentMessage }])
      }, 1000) 

      setUserInput("")  
    }
  }

  return (
    <Flex vertical justify="space-between" className="mt-5 h-[calc(100vh-145px)] rounded-lg">
      <Flex vertical gap='large'>
        {inputData.length ?
        inputData?.map((msg, index) => (
          <Message key={index} user={msg.user} message={msg.message} />
        ))
      :
    <Flex justify="center" align="center" className="h-96">
      <div className="text-gray-500 text-xl">Enter you message to text chat agent..</div>
    </Flex>
      }
      </Flex>
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Type your message..." 
        />
        <Button color="default" variant="solid" onClick={handleClick}>
          Submit
        </Button>
      </Space.Compact>
    </Flex>
  )
}

const Message = ({ user, message }: { user: string, message: string }) => {
  return (
    <Flex vertical gap={3}>
      <Flex gap='small'>
        <Avatar>{user[0]}</Avatar>
        <div className="font-bold text-xl text-gray-500">{user}</div>
      </Flex>
      <Typography.Text>{message}</Typography.Text>
    </Flex>
  )
}

export default TestChat

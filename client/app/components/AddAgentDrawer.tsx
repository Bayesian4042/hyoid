import { Button, Drawer, Flex, Input,Typography } from 'antd'
import AgentLogo from './AgentLogo'

const AddAgentDrawer = ({setOpen,open,title}:any) => {
  return (
    <Drawer open={open} width={600} title={<Flex gap='small' align='center'><AgentLogo size={20}/> <h1>Create an {title} Agent</h1> </Flex>} onClose={() => setOpen(false)}>
  <Flex vertical justify='space-between' className='h-[calc(100vh-119px)]'>
    <div>
   <Typography.Title level={5}>Agent Name</Typography.Title>
    <Input placeholder='Enter name' className='py-2' />
    </div>
    <Flex justify='flex-end'>

    <Button className='w-fit'>Create Agent</Button>
    </Flex>
  </Flex>
        </Drawer>
  )
}

export default AddAgentDrawer
import { Button, Drawer, Flex, Input,Typography } from 'antd'
import Logo from '~/components/ui/Logo'
import { LuBot } from "react-icons/lu"

const AddAgentDrawer = ({setOpen,open,title}:any) => {
  return (
    <Drawer open={open} width={600} title={<Flex gap='small' align='center'><Logo logo={<LuBot size={27}/>}/> <h1>Create an {title} Agent</h1> </Flex>} onClose={() => setOpen(false)}>
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
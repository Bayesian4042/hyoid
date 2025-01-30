import { Drawer, Flex, Input, Select } from 'antd'
import Logo from '~/components/ui/EmojiAvatar';

const ToolsDrawer = ({open,setOpen}:any) => {
  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><Logo pathname='' /> <h3>Add tool</h3></Flex>}>
      <h1 className='font-semibold text-xl'>Configuration</h1>
      <h3>Describe how LLM should use tool.</h3>
      <h1 className='mt-5 font-semibold text-base'>Name</h1>
      <Input/>
      <h1 className='mt-5 font-semibold text-base'>Description</h1>
      <Input.TextArea rows={3}/>
      <Flex gap={20} className='w-full mt-5'>
        <div>
        <h1 className='font-semibold text-base'>Method</h1>
        <Select defaultValue="GET"   style={{ width: 100 }}  options={[{ value: 'GET', label: 'GET' },{ value: 'POST', label: 'POST' },{ value: 'PATCH', label: 'PATCH' },{ value: 'DELETE', label: 'DELETE' }]}/>
        </div>
        <div className='w-full'>
        <h1 className='font-semibold text-base'>URL</h1>
        <Input/>
        </div>
      </Flex>
    </Drawer>
  )
}

export default ToolsDrawer
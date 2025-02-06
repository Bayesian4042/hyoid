import { Drawer, Flex, Input, Select } from 'antd'
import Logo from '~/components/ui/EmojiAvatar';

const ToolsDrawer = ({open,setOpen}:any) => {
  return (
    <Drawer 
    width={600} 
    open={open} 
    onClose={() => setOpen(false)} 
    title={
      <Flex 
        gap="small" 
        align="center" 
      >
        <Logo pathname='' /> 
        <h3 className="text-lg font-medium text-gray-800">Add Tool</h3>
      </Flex>
    }
    className="custom-drawer"
  >
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration</h1>
      <p className="text-gray-600 mb-4">Describe how LLM should use the tool.</p>

      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-800">Name</h2>
        <Input 
          placeholder="Enter tool name" 
          className="w-full rounded-md"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-800">Description</h2>
        <Input.TextArea 
          rows={3} 
          placeholder="Provide a detailed description of the tool"
          className="w-full rounded-md"
        />
      </div>

      <Flex gap={20} className="w-full space-x-4">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Method</h2>
          <Select 
            defaultValue="GET"
            className="w-32"
            options={[
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' }
            ]}
          />
        </div>
        <div className="flex-grow space-y-2">
          <h2 className="text-base font-semibold text-gray-800">URL</h2>
          <Input 
            placeholder="Enter API endpoint URL"
            className="w-full rounded-md"
          />
        </div>
      </Flex>
    </div>
  </Drawer>
  )
}

export default ToolsDrawer
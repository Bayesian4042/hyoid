import { Drawer, Flex } from 'antd'
import Logo from '~/components/ui/EmojiAvatar';

const ToolsDrawer = ({open,setOpen}:any) => {
  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><Logo pathname='' /> <h3>Add tool</h3></Flex>}></Drawer>
  )
}

export default ToolsDrawer
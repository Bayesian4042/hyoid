import { Drawer, Flex } from 'antd'
import React from 'react'
import { FiTool } from "react-icons/fi";
import Logo from '~/components/ui/Logo';

const ToolsDrawer = ({open,setOpen}:any) => {
  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><Logo logo={<FiTool size={20}/>}/> <h3>Add tool</h3></Flex>}></Drawer>
  )
}

export default ToolsDrawer
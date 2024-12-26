import { Button, Space } from 'antd'
import React from 'react'
import { HeaderProps } from '~/types/common'

const Header:React.FC<HeaderProps> = ({title,buttons}) => {
  return (
    <div className='h-16 border-b-[1px] flex justify-between items-center  px-7'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <Space>
        {buttons?.map((button:any,idx:any)=> (
        <Button key={idx} onClick={button.action}>
        {button.title}
        </Button>
        ))}
        </Space>
    </div>
  )
}

export default Header
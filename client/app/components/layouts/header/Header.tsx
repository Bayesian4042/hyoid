import { Button, Space } from 'antd'
import React from 'react'
import { HeaderProps } from '~/types/common'

const Header:React.FC<HeaderProps> = ({title,buttons}) => {
  return (
    <div className='px-7'>
      <div className='h-16 border-b-2 flex justify-between items-center '>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <Space>
        {buttons?.map((button:any,idx:any)=> (
          <Button key={idx} onClick={button.action} icon={button.icon} className='text-xl rounded-full'>
        </Button>
        ))}
        </Space>
        </div>
    </div>
  )
}

export default Header
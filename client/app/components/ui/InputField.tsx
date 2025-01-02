import { Input } from 'antd'
import React from 'react'
import { InputFieldProps } from '~/types/common'

const InputField :React.FC<InputFieldProps> = ({title,desc,row,value,setValue}) => {
  return (
    <div className='rounded-2xl px-9'>
        <div className=' mb-4'>
        <h1 className='font-semibold'>{title}</h1>
        <h6 className='text-gray-500'>{desc}</h6>
        </div>
        <Input.TextArea
        value={value}
        placeholder="e.g. Hello, how can I help you today?"
        autoSize={{ minRows: row, maxRows: 9 }}
        onChange={e=> setValue(e.target.value)}
      />
  
        </div>
  )
}

export default InputField
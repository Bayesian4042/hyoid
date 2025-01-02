import { InputNumber } from 'antd'
import React from 'react'
import { NumberInputProps } from '~/types/common'

const NumberInput :React.FC<NumberInputProps> = ({title,desc,value,setValue}) => {
  return (
    <div className='rounded-2xl px-9'>
        <div className=' mb-4'>
        <h1 className='font-semibold'>{title}</h1>
        <h6 className='text-gray-500'>{desc}</h6>
        </div>
        <InputNumber
        className='w-full py-1'
        type='number'
        value={value}
        placeholder="Enter your number"
        onChange={value => setValue(value)}
      />
  
        </div>
  )
}

export default NumberInput
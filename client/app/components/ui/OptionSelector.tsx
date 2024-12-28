import { Flex, Select } from 'antd'
import React from 'react'
import { OptionSelectorProps } from '~/types/common'

const OptionSelector:React.FC<OptionSelectorProps> = ({ title, desc,options,defaultValue}) => {
  return (
    <Flex className='px-8' justify='space-between' align='center'>
      <div className='w-[410px]'>
        <h1 className='font-semibold'>{title}</h1>
        <h6 className='text-gray-500'>{desc}</h6>
      </div>
      <Select
        defaultValue={defaultValue}
        className='w-40'
        options={options}
      />
    </Flex>
  )
}

export default OptionSelector
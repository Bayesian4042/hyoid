import { Flex, Select } from 'antd'

const OptionSelector = ({ title, desc,options,defaultValue}: any) => {
  return (
    <Flex className='border-[1px] py-5 rounded-2xl px-8 bg-gray-50' justify='space-between' align='center'>
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
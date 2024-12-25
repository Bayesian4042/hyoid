import { Input } from 'antd'

const InputField = ({title,desc,row,value,setValue}:any) => {
  return (
    <div className='border-[1px] py-5 rounded-2xl px-3 bg-gray-50'>
        <div className='px-6 mb-4'>
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
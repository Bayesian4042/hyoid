import { Button, Flex } from "antd"

const OpenModalButton = ({title,desc,button,setOpen}:any) => {
  return (
    <Flex justify="space-between" align="center" className='border-[1px] py-5 rounded-2xl px-9 bg-gray-50'>
        <div className='w-[410px]'>
        <h1 className='font-semibold'>{title}</h1>
        <h6 className='text-gray-500'>{desc}</h6>
        </div>
       <Button onClick={() => setOpen(true)}>{button}</Button>
        </Flex>
  )
}

export default OpenModalButton
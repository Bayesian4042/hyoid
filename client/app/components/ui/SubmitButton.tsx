import { Button } from 'antd'

const SubmitButton = ({text,action}:any) => {
  return (
    <Button className="w-[50%] rounded-lg py-5 px-10 font-bold text-lg" color='default' variant='solid' onClick={action}>{text}</Button>
  )
}

export default SubmitButton
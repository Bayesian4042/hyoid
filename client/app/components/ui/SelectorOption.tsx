import { Flex } from 'antd'

const SelectorOption = ({options,setSelectedOption,selectedOption}:any) => {
  return (
    <Flex gap={3} className='bg-gray-100 p-1 border-[1px] rounded-md'>
        {options?.map((option:string) => 
        <div key={option} className={`${selectedOption === option ? "bg-white" :""}  py-1.5 px-2 w-full text-center rounded-md cursor-pointer font-semibold`} onClick={() => setSelectedOption(option)}>{option}</div>
        )}
        
    </Flex>
  )
}

export default SelectorOption
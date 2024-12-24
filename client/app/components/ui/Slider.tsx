import { Slider } from 'antd'
import React from 'react'

const CustomSlider = ({title,desc}:any) => {
  return (
    <div className='border-[1px] py-4 rounded-2xl px-9 bg-gray-50'>
    <div className=' mb-4'>

    <h1 className='font-semibold'>{title}</h1>
    <h6 className='text-gray-500'>{desc}</h6>
    </div>
    <Slider /> 

    </div>
  )
}

export default CustomSlider
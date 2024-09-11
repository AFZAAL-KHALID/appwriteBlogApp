import React from 'react'
import { forwardRef } from 'react'
import { useId } from 'react'

const SelectCompnt = ({
    options,
    lable,
    classname = "",
    ...props
}, ref) => {
    const ID = useId()

  return (
    <div className='w-full'>
        {lable && <lable
        htmlFor = {ID}
        className={`${classname}`}>{lable}</lable>}
   
    <select 
    ref={ref} name="" id={ID} {...props}
     className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
    >
        {options?.map((option)=>(
            <option key={option} value={option}>{option}</option>
        ))}

    </select>
    </div>
  )
}

export default forwardRef(SelectCompnt) 
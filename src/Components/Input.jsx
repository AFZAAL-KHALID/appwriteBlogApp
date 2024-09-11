import React, {forwardRef, useId} from 'react'

const Input = ({
    lable,
    type = "text",
    classname = "",
    ...props
}, ref) => {
    const ID = useId()

  return (
    <div>
        {lable && <lable 
        htmlFor= {ID}
        classname="inline-block mb-1 pl-1">{lable}</lable>}

        <input 
        ref={ref}
        type={type} 
        id={ID}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`} {...props} />
    </div>
  )
}

export default forwardRef(Input) 
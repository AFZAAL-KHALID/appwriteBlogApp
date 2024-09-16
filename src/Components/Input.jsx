import React, {useId} from 'react'

const Input = ({
    lable,
    type = "text",
    className = "",
    ...props
}, ref) => {
    const ID = useId()

  return (
    <div>
        {lable && <lable 
        htmlFor= {ID}
        className="inline-block mb-1 pl-1">{lable}</lable>}

        <input 
        ref={ref}
        type={type} 
        id={ID}
        className={`px-3 py-2  rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} />
    </div>
  )
}

export default React.forwardRef(Input)
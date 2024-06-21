import React, {useId} from 'react';

const Input = React.forwardRef( function Input({    // Input is generalized & it will be used for every field of a form like the username, password, etc
    label,  // label can be Username for the field username & Password for the field password
    type = 'text',
    classname = "",
    ...props

}, ref) {
    const id = useId()   // we get ref by using forwardRef
    return(
        <div className='w-full'>
            {label && <label // id label is enterd then we display that label
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
                {label}
            </label>}
            <input 
            type={type} 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-50 duration-200 border
                 border-gray-200 w-full ${classname}`} 
            ref={ref}
            {...props} 
            id={id} // now, the unique id generated ny useId is attached both in label & input. Hence, label & input are connected i.e when a user will click on a label, the input field of that label will get highlighted
            />
        </div>
    )
})

export default Input;
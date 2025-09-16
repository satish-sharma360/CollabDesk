import React from 'react'

const TextInput = (props) => {
  return (
    <div>
      <input 
      className='bg-zinc-700 flex items-center justify-center w-[200px] text-[18px] text-gray-300 p-1.5 outline-none transition-all duration-200 hover:border-[1px] border-gray-600 rounded' 
      type="text" {...props}/>
    </div>
  )
}

export default TextInput

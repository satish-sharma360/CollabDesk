import { ArrowRight } from 'lucide-react'
import React from 'react'

const Button = ({text ,click}) => {
  return (
    <div>
      <button onClick={click} className="group text-white flex items-center cursor-pointer justify-center gap-2 bg-green-400  px-4 py-1.5 rounded-full drop-shadow-2xl drop-shadow-[#ddff0021]">
            <span className='text-[18px]'>{text}</span>
            <ArrowRight className="transition-all duration-200 group-hover:ml-2" />
        </button>
    </div>
  )
}

export default Button

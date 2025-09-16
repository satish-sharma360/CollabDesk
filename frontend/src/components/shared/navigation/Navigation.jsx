import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='py-[20px] mb-16'>
      <Link className='text-3xl font-bold bg-[linear-gradient(2005deg,rgb(255,255,247)_8.55%,rgb(114,114,103)_107.01%)] bg-clip-text text-transparent' to='/'>Collab<span className='text-green-400'>Desk</span></Link>
    </div>
  )
}

export default Navigation

import React, { useState } from 'react'
import Card from '../../components/shared/Card'
import Button from '../../components/shared/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../../store/activateSlice'
import { activate } from '../../Http'
import { setAuth } from '../../store/authSlice'

const StepAvatar = ({click}) => {
  const {name ,avatar} = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const [image , setImage] = useState('https://images.unsplash.com/photo-1705932461994-6fb2b07f27dd?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

  const captureImage = (e) =>{
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      console.log(reader.result)
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  const submitHandler = async () =>{
    try {
      const {data} = await activate({ name, avatar })
      if (data.auth) {
        dispatch(setAuth(data))
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <Card title={`👋 Okey, ${name}!`}>
          <p className='text-center text-gray-300'>How's this photo?</p>
          <div className='h-[110px] w-[110px] border-[4px] shadow-2xl border-green-400 rounded-full overflow-hidden'>
            <img className='h-full w-full object-cover object-top' src={image} alt="avatar" />
          </div>
          <div>
            <label htmlFor="avatarInput" className=' inline-block cursor-pointer hover:underline hover:text-green-400'>Choose a different photo</label>
            <input onChange={captureImage} type="file" id='avatarInput' className='hidden'/>
          </div>
          <div>
            <Button click={submitHandler} text='Next'/>
          </div>
      </Card>
    </div>
  )
}

export default StepAvatar

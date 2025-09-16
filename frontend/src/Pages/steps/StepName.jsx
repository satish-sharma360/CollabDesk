import React, { useState } from 'react'
import Card from '../../components/shared/Card'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../store/activateSlice'

const StepName = ({click}) => {

  const dispatch = useDispatch()
  const {name} = useSelector((state)=> state.activate)
  const [fullname , setFullname] = useState('')

  const nextStep = () =>{
    if (!fullname) {
      return;
    }
    console.log("clkicke")
    dispatch(setName(fullname))
    click()
  }
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <Card title={"😎What's your name?"}>
        <TextInput value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
          <p className='text-center text-gray-300 w-[70%]'>People use real names at collabDesk :)</p>
          <div>
            <Button click={nextStep} text='Next'/>
          </div>
      </Card>
    </div>
  )
}

export default StepName

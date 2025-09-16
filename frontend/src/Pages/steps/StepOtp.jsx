import React, { useState } from 'react'
import Card from '../../components/shared/Card'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'

const StepOtp = ({click}) => {
  const [otp,setOtp] = useState('')
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <Card title={"🔒Enter OTP to continue"}>
        <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
          <div>
            <Button  text='Next'/>
          </div>
          <p className='text-center text-gray-300 w-[70%]'>By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
      </Card>
    </div>
  )
}

export default StepOtp

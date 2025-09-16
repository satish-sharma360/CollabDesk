import React, { useState } from 'react'
import Card from '../../components/shared/Card'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { verifyOTP } from '../../Http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice'

const StepOtp = ({click}) => {
  const [otp,setOtp] = useState('')
  const dispatch = useDispatch()

  const {phone,hash} = useSelector((state) =>state.auth.otp)

 const submitHandel = async () => {
  console.log("🔔 Submit function triggered");
  try {
    const { data } = await verifyOTP({ otp, phone, hash });
    console.log(data)
    dispatch(setAuth(data)); 

    // click();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className='h-full w-full flex items-center justify-center'>
      <Card title={"🔒Enter OTP to continue"}>
        <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
          <div>
            <Button click={submitHandel} text='Next'/>
          </div>
          <p className='text-center text-gray-300 w-[70%]'>By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
      </Card>
    </div>
  )
}

export default StepOtp

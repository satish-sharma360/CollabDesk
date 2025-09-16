import React, { useState } from 'react'
import StepName from './steps/StepName'
import StepAvatar from './steps/StepAvatar'

const steps = {
  1:StepName,
  2:StepAvatar 
}

const Activate = () => {
  const [step , setStep] = useState(1);
  const Step = steps[step]
  const click = () =>{
    setStep(step + 1)
  }
  return (
    <div>
      <Step click={click}></Step>
    </div>
  )
}

export default Activate

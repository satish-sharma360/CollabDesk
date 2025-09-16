import React, { useState } from "react";
import StepPhoneEmail from "./steps/StepPhoneEmail";
import StepOtp from "./steps/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};
const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const handleClick = () => {
    setStep(step + 1);
  };

  
  return (
    <div>
      <Step click={handleClick} />
    </div>
  );
};

export default Authenticate;






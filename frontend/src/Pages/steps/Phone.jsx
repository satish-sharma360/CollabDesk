import React, { useState } from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import TextInput from "../../components/shared/TextInput";
import { sendOTP } from "../../Http/index";
import { useDispatch } from "react-redux";
import { setOTP } from "../../store/authSlice";

const Phone = ({click}) => {
    const [phoneNumber ,setPhoneNumber] = useState("")

    const dispatch = useDispatch() 


    const submit = async () =>{
      if (!phoneNumber) return
      const {data} = await sendOTP({phone:phoneNumber})
      console.log(data)
      dispatch(setOTP({phone:data.phone,hash:data.hash}))
      click()
    }
  return (
    <div>
      <Card title={"📞Enter Your Phone number"}>
        <TextInput
        placeholder="+91 88776-65544"
         value={phoneNumber} 
         onChange={(e) => setPhoneNumber(e.target.value)}/>
        <div className="flex flex-col items-center gap-8">
          <Button text={"Next"} click={submit}/>
          <p className="text-center text-gray-300 w-[70%]">By entering your number, you're agreeing to our Terms of Service and Privacy.Thanks!</p>
        </div>
      </Card>
    </div>
  );
};

export default Phone;

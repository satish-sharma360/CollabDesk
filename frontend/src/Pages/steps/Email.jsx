import React, { useState } from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import TextInput from "../../components/shared/TextInput";

const Email = ({click}) => {
  const [email, setEmail] = useState("");
  return (
    <div>
      <Card title={"📩Enter your Email Id"}>
        <TextInput 
        placeholder="test@gmail.com"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />
        <div className="flex flex-col items-center gap-8">
          <Button text={"Next"} click={click}/>
          <p className="text-center text-gray-300 w-[70%]">
            By entering your number, you're agreeing to our Terms of Service and
            Privacy.Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Email;

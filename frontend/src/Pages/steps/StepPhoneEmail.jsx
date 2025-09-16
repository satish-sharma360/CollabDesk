import React, { useState } from "react";
import Phone from "./Phone";
import Email from "./Email";
import { Mail, Smartphone } from "lucide-react";

const phoneEmail = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ click }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmail[type];

  return (
    <div className="flex max-w-[435px] mx-auto flex-col items-center justify-center relative">
      {/* Toggle Buttons Bar */}
      <div className="absolute -top-12 -right-0 flex gap-2">
        <button
          className={`${
            type === "phone"
              ? "bg-green-400 text-black"
              : "bg-zinc-800 text-white"
          } flex items-center justify-center h-10 w-10 rounded cursor-pointer`}
          onClick={() => setType("phone")}
        >
          <Smartphone />
        </button>
        <button
          className={`${
            type === "email"
              ? "bg-green-400 text-black"
              : "bg-zinc-800 text-white"
          } flex items-center justify-center h-10 w-10 rounded cursor-pointer`}
          onClick={() => setType("email")}
        >
          <Mail />
        </button>
      </div>

      {/* Render component below buttons */}
      <Component click={click} />
    </div>
  );
};

export default StepPhoneEmail;

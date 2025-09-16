import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, children }) => {
  return (
    <>
      <div className="absolute mt-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[300px] h-[100px] bg-red-300 rounded-full inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 blur-3xl opacity-30"></div>
      <div className="flex relative flex-col bg-zinc-800 w-[550px] max-w-[90%] rounded shadow-2xs shadow-green-400 gap-8 p-8 items-center">
        <div className="text-center text-3xl tracking-wider textga font-bold">
          <h1 className="">{title}</h1>
        </div>
        <div className="z-20 flex items-center flex-col gap-8">
            {children}
        </div>
      </div>
    </>
  );
};

export default Card;

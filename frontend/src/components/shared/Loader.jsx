import React from "react";
import Card from "./Card";

const Loader = ({ message }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card>
        <div className="flex flex-col items-center space-y-3">
          {/* Buffering Dots */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]"></div>
          </div>

          {/* Message (new row) */}
          {message && (
            <span className="text-gray-400 font-bold">{message}</span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Loader;

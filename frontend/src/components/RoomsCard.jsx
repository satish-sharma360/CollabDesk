import { MessageCircleMore, SquareUserRound } from "lucide-react";
import React from "react";

const RoomsCard = ({ room }) => {
  return (
    <div className="bg-zinc-800 rounded-[6px] flex flex-col gap-8 transition-all duration-200 hover:bg-zinc-700 border border-gray-700 p-[20px] cursor-pointer ">
      <h3 className="">{room.topic}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {room.speakers.map((speaker, idx) => (
            <img
              key={speaker.id}
              src={speaker.avatar}
              alt=""
              className={`h-[40px] w-[40px] rounded-full object-top object-cover border-2 border-white ${
                idx !== 0 ? "-ml-4" : ""
              }`}
              style={{
                position: "relative",
                zIndex: room.speakers.length - idx,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-center flex-col">
          {room.speakers.map((speaker) => (
            <div className="flex items-center justify-between gap-2" key={speaker.id}>
              <span>{speaker.name}</span>
              <MessageCircleMore size={18}/>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center w-full gap-2">
        <SquareUserRound />
        <span>{room.totalPeople}</span>
      </div>
    </div>
  );
};

export default RoomsCard;

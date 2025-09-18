import { MessageCircleMore, SquareUserRound } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RoomsCard = ({ room }) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/room/${room.id}`)} className="bg-zinc-800 rounded-[6px] flex flex-col gap-8 transition-all duration-200 hover:bg-zinc-700 border border-gray-700 p-4 sm:p-6 md:p-6 lg:p-8 cursor-pointer ">
      <h3 className="text-xl font-bold">{room.topic}</h3>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex items-center justify-center gap-2">
          {room.speakers.map((speaker, idx) => (
            <img
              key={speaker.id}
              src={speaker.avatar}
              alt=""
              className={`h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10 rounded-full object-top object-cover border-2 border-white ${idx !== 0 ? '-ml-3' : ''}`}
              style={{
                position: "relative",
                zIndex: room.speakers.length - idx,
              }}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-2">
          {room.speakers.map((speaker) => (
            <div className="flex items-center gap-2" key={speaker.id}>
              <span className="text-xs sm:text-sm md:text-base">{speaker.name}</span>
              <MessageCircleMore size={18} />
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

import React, { useState } from "react";
import TextInput from "./shared/TextInput";
import privacy from "../assets/privacy.png";
import social from "../assets/social.png";
import earth from "../assets/earth.png";
import { ArrowUpRight, X } from "lucide-react";
import { createRoom as create } from "../Http";
import { useNavigate } from "react-router-dom";

const AddRoomModel = ({onClose}) => {
    const [roomType , setRoomType] = useState('open')
    const [topic , setTopic] = useState('')
    const navigate = useNavigate()

    const createRoom = async () =>{
        // server call
        try {
            if (!topic) return
            const {data} = await create({roomType,topic})
            navigate(`/room/${data.id}`)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    
  return (
    <div className="bg-[#000000c6] fixed z-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <div className="bg-zinc-800 w-1/2 max-w-[500px] rounded-[6px] border-[1px] border-gray-700">
        <div className="p-[30px] flex flex-col gap-4 border-b-[1px] border-gray-500">
          <div className="flex gap-4 items-center justify-between">
            <h3 className="text-lg">Enter the topic to be disscussed</h3>
            <button onClick={onClose} className="cursor-pointer rounded-full transition-all duration-200 h-10 w-10 p-2 hover:bg-zinc-700"><X /></button>
            
          </div>
          <TextInput fullwidth={"true"} value={topic} onChange={(e) => setTopic(e.target.value)}/>
          <h2 className="text-lg">Rooms Types</h2>
          <div className="grid grid-cols-3 gap-4">
            <div onClick={()=>setRoomType('open')} className={`flex ${roomType === 'open' ? 'bg-zinc-900' : 'bg-zinc-700'} flex-col items-center transition-all duration-200 hover:scale-95 p-5 rounded cursor-pointer`}>
              <img src={earth} alt="" />
              <span>Open</span>
            </div>
            <div onClick={()=>setRoomType('social')} className={`flex ${roomType === 'social' ? 'bg-zinc-900' : 'bg-zinc-700'} flex-col items-center transition-all duration-200 hover:scale-95 p-5 rounded cursor-pointer`}>
              <img src={social} alt="" />
              <span>Social</span>
            </div>
            <div onClick={()=>setRoomType('private')} className={`flex ${roomType === 'private' ? 'bg-zinc-900' : 'bg-zinc-700'} flex-col items-center transition-all duration-200 hover:scale-95 p-5 rounded cursor-pointer`}>
              <img src={privacy} alt="" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4 px-[30px] items-center">
          <h2>Start a room, open to everyone</h2>
          <div className="right flex justify-end">
            <button onClick={createRoom} className="group flex items-center gap-4 border border-gray-600 px-4 py-[8px] rounded-full cursor-pointer bg-zinc-700 w-full">
              <span>Let's Go</span>
              <ArrowUpRight className="transition-all duration-200 group-hover:rotate-45 group-hover:ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;

import { Search, User, Wifi } from "lucide-react";
import React, { useState } from "react";
import { RiUserVoiceLine } from "react-icons/ri";
import RoomsCard from "../components/RoomsCard";
import AddRoomModel from "../components/AddRoomModel";
import { useEffect } from "react";
import { getAllRooms } from "../Http";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework is best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "Alice Johnson",
//         avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
//       },
//       {
//         id: 2,
//         name: "Mark Smith",
//         avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: "State management in React vs Vue?",
//     speakers: [
//       {
//         id: 1,
//         name: "Sophia Lee",
//         avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//       },
//       {
//         id: 2,
//         name: "Daniel Kim",
//         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//       },
//     ],
//     totalPeople: 55,
//   },
//   {
//     id: 3,
//     topic: "Best practices for Node.js APIs",
//     speakers: [
//       {
//         id: 1,
//         name: "Olivia Brown",
//         avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
//       },
//       {
//         id: 2,
//         name: "Ethan Miller",
//         avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
//       },
//     ],
//     totalPeople: 32,
//   },
//   {
//     id: 4,
//     topic: "Introduction to TypeScript",
//     speakers: [
//       {
//         id: 1,
//         name: "Grace Wilson",
//         avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//       },
//       {
//         id: 2,
//         name: "Henry Davis",
//         avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       },
//     ],
//     totalPeople: 28,
//   },
//   {
//     id: 5,
//     topic: "Building REST vs GraphQL APIs",
//     speakers: [
//       {
//         id: 1,
//         name: "Ava Martinez",
//         avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//       },
//       {
//         id: 2,
//         name: "Liam Anderson",
//         avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       },
//     ],
//     totalPeople: 60,
//   },
//   {
//     id: 6,
//     topic: "Deploying apps with Docker",
//     speakers: [
//       {
//         id: 1,
//         name: "Emma Thomas",
//         avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//       },
//       {
//         id: 2,
//         name: "Noah Garcia",
//         avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       },
//     ],
//     totalPeople: 47,
//   },
//   {
//     id: 7,
//     topic: "Microservices vs Monolithic architecture",
//     speakers: [
//       {
//         id: 1,
//         name: "Mia Robinson",
//         avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
//       },
//       {
//         id: 2,
//         name: "James Clark",
//         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//       },
//     ],
//     totalPeople: 38,
//   },
//   {
//     id: 8,
//     topic: "Authentication and Security in Web Apps",
//     speakers: [
//       {
//         id: 1,
//         name: "Charlotte Rodriguez",
//         avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//       },
//       {
//         id: 2,
//         name: "Benjamin Lewis",
//         avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
//       },
//     ],
//     totalPeople: 72,
//   },
//   {
//     id: 9,
//     topic: "Machine Learning for Web Developers",
//     speakers: [
//       {
//         id: 1,
//         name: "Amelia Walker",
//         avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       },
//       {
//         id: 2,
//         name: "Lucas Hall",
//         avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//       },
//     ],
//     totalPeople: 44,
//   },
//   {
//     id: 10,
//     topic: "Design Systems and UI Libraries",
//     speakers: [
//       {
//         id: 1,
//         name: "Harper Allen",
//         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//       },
//       {
//         id: 2,
//         name: "Mason Young",
//         avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
//       },
//     ],
//     totalPeople: 53,
//   },
//   {
//     id: 11,
//     topic: "Introduction to Web3 and Blockchain",
//     speakers: [
//       {
//         id: 1,
//         name: "Ella Hernandez",
//         avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
//       },
//       {
//         id: 2,
//         name: "Logan King",
//         avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//       },
//     ],
//     totalPeople: 65,
//   },
//   {
//     id: 12,
//     topic: "Scaling applications for millions of users",
//     speakers: [
//       {
//         id: 1,
//         name: "Scarlett Wright",
//         avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       },
//       {
//         id: 2,
//         name: "William Scott",
//         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//       },
//     ],
//     totalPeople: 80,
//   },
// ];

const Rooms = () => {
  const [showModel, setShowModel] = useState(true);
  const [rooms, setRomms] = useState([]);

  useEffect(()=>{
    const fetchRooms = async () =>{
      const {data} =  await getAllRooms()
      setRomms(data)
      console.log(data)
    }
    fetchRooms()
  },[])

  React.useEffect(() => {
    if (showModel) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Clean up in case component unmounts while modal is open
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showModel]);

  const openModel = () =>{
    setShowModel(true)
  }


  return (
    <>
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <span className="text-xl text-gray-400 font-bold">
                All Voice rooms
              </span>
              <div className="absolute h-[2px] w-[60%] -bottom-2 bg-green-400 rounded-full drop-shadow-2xl drop-shadow-green-700"></div>
            </div>
            <div className="flex bg-zinc-800 sm:ml-4 items-center rounded-full pl-[10px] py-[1px] min-w-[200px] sm:min-w-[300px] border border-gray-700 hover:drop-shadow-xl drop-shadow-zinc-800 mt-2 sm:mt-0">
              <input
                type="text"
                className="bg-transparent w-full border-0 outline-0 p-[8px] text-gray-400"
              />
              <Search className="w-12 cursor-pointer" />
            </div>
          </div>
          <div className="right flex justify-end">
            <button
              onClick={openModel}
              className="flex items-center gap-4 border border-gray-600 px-4 py-[8px] rounded-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 w-full md:w-auto"
            >
              <RiUserVoiceLine />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
          {rooms.map((room) => (
            <RoomsCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {showModel && <AddRoomModel onClose={()=>setShowModel(false)}/>}
    </>
  );
};

export default Rooms;

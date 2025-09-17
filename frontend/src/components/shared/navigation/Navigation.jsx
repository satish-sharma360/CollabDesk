import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../Http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { setAvatar } from "../../../store/activateSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { name: activateName, avatar: activateAvatar } = useSelector((state) => state.activate);
  const { isAuth, user } = useSelector((state) => state.auth);

  // Prefer activate slice, fallback to auth.user
  const name = activateName || (user && user.name) || "";
  const avatar = activateAvatar || (user && user.avatar) || "";

  const logOut = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      dispatch(setAvatar("")); // Clear avatar on logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center h-16 mb-28 border-b-[1px] border-gray-600 shadow-2xl">
      <div className="w-11/12 mx-auto flex items-center justify-between ">
        {/* Left: Logo */}
        <Link
          className="text-3xl font-bold bg-[linear-gradient(2005deg,rgb(255,255,247)_8.55%,rgb(114,114,103)_107.01%)] bg-clip-text text-transparent"
          to="/"
        >
          Collab<span className="text-green-400">Desk</span>
        </Link>
        {/* Right: name, avatar, button */}
        {isAuth && (
          <div className="flex items-center gap-4">
            {name && <span className="font-semibold text-white mr-2">{name}</span>}
            {avatar && (
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-green-400">
                <img className="h-full w-full object-cover object-top" src={avatar} alt="" />
              </div>
            )}
            <button
              onClick={logOut}
              className="px-6 py-[8px] bg-zinc-800 hover:bg-zinc-700  border border-gray-600 cursor-pointer transition-all duration-200 rounded-full"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../Http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const {isAuth } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.activate);

  const logOut = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-[20px] mb-16 flex items-center justify-between">
      <Link
        className="text-3xl font-bold bg-[linear-gradient(2005deg,rgb(255,255,247)_8.55%,rgb(114,114,103)_107.01%)] bg-clip-text text-transparent"
        to="/"
      >
        Collab<span className="text-green-400">Desk</span>
      </Link>
      
      {
        isAuth && <div className={`flex items-center justify-between gap-4`}>
        <button
          onClick={logOut}
          className="px-3.5 py-2.5 bg-green-400 cursor-pointer hover:bg-green-500 transition-all duration-200 hover:scale-95 rounded-full"
        >
          Log Out
        </button>
         {avatar && <div className="h-12 w-12 overflow-hidden rounded-full border-1 border-green-400">
            <img src={avatar} alt="" />
        </div>}
      </div>
      }
    </div>
  );
};

export default Navigation;

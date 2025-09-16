import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";


const Home = () => {

    const navigation = useNavigate()

    const handleRegister = () =>{
        navigation('/authenticate')
    }

  return (
    <div className="w-full relative flex gap-2 items-center justify-center">
    <Card title={"Welcome to CollabDesk"}>
        <p className="text-center leading-6 text-[18px]">
        The wait is over <span className="text-green-400">—</span> CollabDesk is now ready for you.

        Create rooms, connect with others, share your screen,
        and even collaborate with remote control <span className="text-green-400">—</span> all in one place.

        We’re excited to have you onboard. Let’s start collaborating!
      </p>
      <div>
        <Button click = {handleRegister} text={"Let's Go"}/>
      </div>
      <div>
        <span>Have an invite text? </span>
      </div>
    </Card>
    </div>
  );
};

export default Home;

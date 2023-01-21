import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <h1 className="text-2xl font-bold text-pallete-purple-500 transform -translate-y-32">
              Oops! Page not found. Click the button below to go back to the
              homepage.
            </h1>
            <button
              onClick={() => navigate("/")}
              className="bg-pallete-purple-500 text-white font-bold py-2 px-4 rounded-full transform -translate-y-32"
            >
              Go back to homepage
            </button>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;

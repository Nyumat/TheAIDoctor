import React from "react";
import { useNavigate } from "react-router";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1>Welcome to Our Application!</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/home")}
      >
        Get Started
      </button>
    </div>
  );
};

export default Intro;

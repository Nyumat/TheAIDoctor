import React from "react";
import { useNavigate } from "react-router";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      {/* <h1>Welcome to Our Application!</h1>*/}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        onClick={() => navigate("/home")}
      >
        Get Started
      </button>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Doctor AI</h1>
      {/* 
      <div class="absolute top-0 right-0 ...">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/home")}
      >
        Login
      </button>
      </div>
      */}
<section class="h-screen">
  <div class="px-6 h-full text-gray-800">
    <div
      class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-8/12 md:w-9/12 mb-12 md:mb-0 pr-24">
        <img
          src="../assets/giflogo.gif"
          class="w-full"
          alt="Sample image"
        />
      </div>
      
      <div class="">
        <form>
          <div class="flex flex-row items-center justify-center lg:justify-start">
            <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        Sign in with

<br></br>
        <span
              type="button"

            >
              {/* Google */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" class="w-4 h-4">
                {/*! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
            </span>
      </button>



          </div>

          <div class="text-center lg:text-left">
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Intro;

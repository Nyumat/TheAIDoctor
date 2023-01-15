import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



function SignOut() {
  const auth = firebase.auth();
  const navigate = useNavigate();
  return (
    auth.currentUser && (
      <button
        className="text2xl text-pallete-purple-600 hover:text-pallete-purple-800"
        onClick={() => {
          auth.signOut();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    )
  );
}

const Navbar = () => {
  return (
    <header className="absolute top-0 w-screen">
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-pallete-purple-200 relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="w-full relative flex flex-col justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
            <div className="absolute right-0 pr-16 mt-4">
              <SignOut />
            </div>
            <h1 className="text-white text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
              The AI Doctor
            </h1>
            {/* Todo, routers */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LogoutIcon from "./LogoutIcon";
import SettingsIcon from "./SettingsIcon";
import ChatIcon from "./ChatIcon";

firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

function SignOut() {
  const auth = firebase.auth();
  const navigate = useNavigate();
  return (
    auth.currentUser && (
      <LogoutIcon
        className="text-xl ml-auto text-pallete-purple-600 hover:text-pallete-purple-800"
        onClick={async () => {
          await auth.signOut();
        }}
      ></LogoutIcon>
    )
  );
}

const Navbar = () => {
  return (
    <header className="absolute top-0 w-screen">
      {/* <!-- Navbar --> */}
      <nav className="navbar h-fit navbar-expand-lg shadow-md py-2 bg-pallete-purple-200 relative flex items-center w-full justify-between">
        <div className="px-6 w-full">
          <Link
            to="/"
            className="text-white text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          >
            The AI Doctor
          </Link>
          <div className="flex flex-row gap-4 w-full flex-wrap justify-end align-center items-center">
            <Link to="/" className="text-white font-bold">
              <SignOut className="cursor-pointer" />
            </Link>
            <Link to="/settings" className="text-white text-2xl font-bold">
              <SettingsIcon className="cursor-pointer scale-125 mr-2" />
            </Link>
            <Link to="/home" className="text-white text-2xl font-bold">
              <ChatIcon className="cursor-pointer scale-125" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

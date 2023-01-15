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
        className="text2xl text-pallete-purple-600 hover:text-pallete-purple-800"
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
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-pallete-purple-200 relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="w-full relative flex flex-col justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
            <div className="absolute right-0 pr-16 mt-2 ml-6">
              <Link to="/" className="text-white text-xl font-bold">
                <SignOut />
              </Link>
            </div>
            <Link
              to="/home"
              className="text-white text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              The AI Doctor
            </Link>
            <div className="absolute right-0 mr-36 translate-y-[-43px]">
              <Link to="/settings" className="text-white text-xl font-bold">
                <SettingsIcon className="cursor-pointer scale-150" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

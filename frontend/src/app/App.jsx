import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import { QueryClient, QueryClientProvider } from "react-query";
import Settings from "../pages/Settings";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import NotFound from "../pages/NotFound";

const auth = firebase.auth();

function App() {
  const queryClient = new QueryClient();
  const [user] = useAuthState(auth);
  const [conditions, setConditions] = useState([]);

  const getConditionsAsString = () => {
    let conditionsString = "";
    conditions.map((condition, index) => {
      conditionsString += condition.value;
      if (index !== conditions.length - 1) {
        conditionsString += ", ";
      }
    });
    return conditionsString;
  };

  let conditionsString = getConditionsAsString();

  return (
    <div className="flex flex-col bg-pallete-purple-300 h-screen w-screen items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/home"
              element={
                <Home
                  conditions={conditionsString}
                  userPhotoUrl={
                    user ? user.photoURL : "https://picsum.photos/200"
                  }
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  conditions={conditions}
                  setConditions={setConditions}
                />
              }
            />
            <Route path="/" element={<Intro />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

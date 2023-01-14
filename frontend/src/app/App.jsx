import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pallete-purple-200">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Intro />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

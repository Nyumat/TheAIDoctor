import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import requests from "../utils/requests";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { TypeAnimation } from "react-type-animation";
import SendIcon from "../components/SendIcon";
import RobotDoctor from "../assets/robot_doctor.jpg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";
import Navbar from "../components/Navbar";

const auth = firebase.auth();

const Home = ({ userPhotoUrl, conditions }) => {
  const [query, setQuery] = useState("");
  const [i, setI] = useState(0);
  const [messages, setMessages] = useState([]);
  const [parent] = useAutoAnimate();
  const [user] = useAuthState(auth);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { id: i, text: query, agent: "user" }]);
    setI(i + 1);

    setQuery("");
    console.log(query);
  };

  const handleSubmitKeyboard = async (i, e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      let old_messages = messages;
      old_messages.push({ id: i, text: query, agent: "user" });
      setI(i + 1);
      let text = query;
      setQuery("");
      setTimeout(async () => {
        await getDoctorResponse(text, old_messages);
      }, 1000);
    }
  };

  const getDoctorResponse = async (query, old_messages) => {
    if (query === "") return;
    const response = await fetchChatGPTResponse(query);
    setIsTyping(true);
    setMessages([...old_messages, { id: i, text: response, agent: "bot" }]);
    setTimeout(() => {
      setIsTyping(false);
    }, 5000);
    setI(i + 1);
  };

  const fetchChatGPTResponse = async (query) => {
    const response = await axios.get(
      `${requests.fetchChatGPT}?query=Considering I have ${conditions}, ${query}}`
    );
    const data = response.data;
    return data.text;
  };

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // We need to show the disclaimer modal only once
    if (messages.length === 1) {
      document.getElementById("my-modal-3").checked = true;
    }

    // We need to continously scroll to the bottom of the chat window only when the bot is typing
    if (isTyping) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages.length, isTyping]);

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-4 mt-16">
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative bg-pallete-purple-200">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2 bg-pallete-purple-900 hover:bg-pallete-purple-700 text-pallete-purple-300 hover:text-pallete-purple-100"
              >
                ✕
              </label>
              <h3 className="text-2xl text-pallete-purple-700 font-bold text-center">
                Disclaimer!
              </h3>
              <p className="py-4 text-center font-semibold text-pallete-purple-700 ">
                This is an AI Chat Bot. <br></br> It is not a real doctor.{" "}
                <br></br>
                <br></br>Remember that it is important to consult a licensed
                healthcare professional for any medical concerns or questions.
                They will be able to provide an accurate diagnosis and treatment
                plan based on your individual case.
              </p>
            </div>
          </div>
          <div
            id="chat-window"
            className="flex flex-col items-center h-[30rem] justify-center gap-8  bg-pallete-purple-100 md:w-[calc(100%-10rem)] rounded-2xl scrollbar-hide overflow-scroll sm:w-100 lg:w-[calc(100%-10rem)] mx-4"
          >
            <div className="flex flex-col items-center">
              <h1 className="text-pallete-purple-500 text-2xl relative text-center">
                Welcome to the AI Doctor Chat{" "}
                {user && user.displayName && (
                  <span className="text-pallete-purple-700">
                    {user.displayName}!
                  </span>
                )}
              </h1>
              <h1 className="text-pallete-purple-500 text-lg mb-64 relative font-bold text-center mx-4">
                Start your conversation with AI Doctor and get your health
                advice.
              </h1>
            </div>
            <div className="w-full px-8" ref={parent} id="messages">
              {messages.map((message, index) => (
                <div className="flex flex-col pt-6" key={index}>
                  {message.agent === "user" ? (
                    <div className="flex flex-row justify-end gap-4">
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img src={userPhotoUrl} />
                          </div>
                        </div>
                        <div className="chat-header text-sm text-gray-500 mb-1 mx-2">
                          {auth.currentUser.displayName}
                          <time className="ml-2 text-sm opacity-50">
                            {moment().format("LT")}
                          </time>
                        </div>
                        <div className="chat-bubble bg-pallete-purple-300 text-gray-900 whitespace-normal break-normal">
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-start gap-4">
                      <div className="chat chat-start w-1/2">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img src={RobotDoctor} />
                          </div>
                        </div>
                        <div className="chat-header text-sm text-gray-500 mb-1 mx-2">
                          AI Doctor
                          <time className="ml-2 text-sm opacity-50">
                            {moment().format("LT")}
                          </time>
                        </div>
                        <div className="chat-bubble text-white bg-pallete-purple-700 whitespace-normal break-words w-[20rem]">
                          <TypeAnimation sequence={[message.text]} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-4 h-[5rem] w-screen">
            <textarea
              className="textarea textarea-primary resize-none bg-pallete-purple-100 ml-24 rounded-2xl text-gray-900 w-screen"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => handleSubmitKeyboard(i, e)}
              value={query}
              placeholder="Type Your Message Here"
            ></textarea>

            <SendIcon
              type="submit"
              className="cursor-pointer mt-5 mr-16"
              onClick={handleSubmit}
            ></SendIcon>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

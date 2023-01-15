import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import requests from "../utils/requests";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import ScrollToBottom from "react-scroll-to-bottom";
import { TypeAnimation } from 'react-type-animation';

const STATIC_MESSAGES = [
  { id: 1, text: "Hello, how are you?", agent: "user" },
  { id: 2, text: "I am fine, how are you?", agent: "bot" },
  { id: 3, text: "I am fine too, thanks for asking.", agent: "user" },
  { id: 4, text: "You are welcome." },
];

// I put the firebase initialize stuff here

const auth = firebase.auth();

const Home = () => {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const [user] = useAuthState(auth);

  // if (user) {
  //   console.log(JSON.stringify(user.displayName));
  // }

  const [messages, setMessages] = useState(STATIC_MESSAGES);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await fetchChatGPTResponse(query);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { id: 5, text: query, agent: "user" }]);

    setQuery("");
    console.log(query);
  };

  const handleSubmitKeyboard = async (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      setMessages([...messages, { id: 5, text: query, agent: "user" }]);

      setQuery("");
      console.log(query);
    }
  };

  const fetchChatGPTResponse = async (query) => {
    const response = await axios.get(
      `${requests.fetchChatGPT}?query=${query}}`
    );
    const data = await response.data;
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requests.fetchExample);
      const data = await response.json();

      // These three lines of code are equivalent to the line below them.
      // let copy = [...resData];
      // copy.push(data);
      // setResData(copy);

      setResData([...resData, data]);
    };

    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <ScrollToBottom>
          <div
            id="chat-window"
            className="flex flex-col items-center justify-center h-full gap-8 py-16 bg-gray-600 w-[64rem] rounded-2xl"
          >
            <div></div>
            {messages.map((message, index) => (
              <div>
                <div className="flex flex-row w-256" key={index}>
                  {message.agent === "user" ? (
                    <div className="chat chat-end">
                      <div className="chat-bubble chat-bubble-info">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-primary">
                      <TypeAnimation

                      sequence =  {[message.text, 100]}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* This cannot collide. */}
            <div className="">
              <div className="absolute bottom-0">
                <div className="flex flex-row gap-4 w-full">
                  <div className="flex flex-row gap-4">
                    <textarea
                      className="textarea textarea-primary resize-none"
                      // value = {(e) => setQuery(e.target.value)}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleSubmitKeyboard}
                      value={query}
                      placeholder="Type Your Message Here"
                    ></textarea>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary bg-pallete-purple-500"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollToBottom>
      </Layout>
    </>
  );
};

export default Home;
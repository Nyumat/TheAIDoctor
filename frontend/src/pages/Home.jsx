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

const STATIC_MESSAGES = [{ id: 1, text: "Hello, how are you?", agent: "bot" }];

// I put the firebase initialize stuff here

const auth = firebase.auth();

const Home = () => {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [user] = useAuthState(auth);
  const [i, setI] = useState(0);

  // if (user) {
  //   console.log(JSON.stringify(user.displayName));
  // }

  const [messages, setMessages] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await fetchChatGPTResponse(query);
  // };

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

      await getDoctorResponse(query, old_messages);
      setQuery("");
    }
  };

  const getDoctorResponse = async (query, old_messages) => {
    if (query === "") return;
    const response = await fetchChatGPTResponse(query);
    setMessages([...old_messages, { id: i, text: response, agent: "bot" }]);
    setI(i + 1);
  };

  const fetchChatGPTResponse = async (query) => {
    const response = await axios.get(
      `${requests.fetchChatGPT}?query=${query}}`
    );
    const data = response.data;
    return data.text;
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // const fetchData = async () => {
    //   const response = await fetch(requests.fetchExample);
    //   const data = await response.json();

    //   // These three lines of code are equivalent to the line below them.
    //   // let copy = [...resData];
    //   // copy.push(data);
    //   // setResData(copy);

    //   setResData([...resData, data]);
    // };

    // When a new message is added to the dom, scroll to the bottom of the chat window
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // fetchData();
  }, [messages]);

  return (
    <>
      <Layout>
        <div
          id="chat-window"
          className="flex flex-col items-center h-[30rem] justify-center gap-8 py-16 bg-gray-600 w-[64rem] rounded-2xl overflow-scroll"
        >
          <h1 className="text-pallete-purple-500 text-2xl mb-64 relative">
            Welcome to AI Doctor Chat{" "}
          </h1>
          <div className="w-full px-8">
            {messages.map((message, index) => (
              <div className="flex flex-col" key={index}>
                {message.agent === "user" ? (
                  <div className="chat chat-end ">
                    <div className="chat-bubble chat-bubble-info">
                      {message.text}
                    </div>
                  </div>
                ) : (
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                      <TypeAnimation sequence={[message.text]} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute translate-x-52 translate-y-72 flex flex-col justify-center items-center w-full">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-row gap-4">
                <textarea
                  className="textarea textarea-primary resize-none w-[65rem] h-[5rem]"
                  // value = {(e) => setQuery(e.target.value)}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => handleSubmitKeyboard(i, e)}
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
      </Layout>
    </>
  );
};

export default Home;

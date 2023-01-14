import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import requests from "../utils/requests";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const STATIC_MESSAGES = [
  { id: 1, text: "Hello, how are you?", agent: "user" },
  { id: 2, text: "I am fine, how are you?", agent: "bot" },
  { id: 3, text: "I am fine too, thanks for asking.", agent: "user" },
  { id: 4, text: "You are welcome." },
];

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
        <div className="flex flex-col items-center justify-center mt-16 h-[40rem] gap-8 py-16 bg-gray-600 w-[64rem] overflow-scroll">
          {messages.map((message, index) => (
            <div>
              <div className="flex flex-row gap-4" key={index}>
                {message.agent === "user" ? (
                  <div className="flex flex-row gap-4 bg-green-700">
                    {message.text}
                  </div>
                ) : (
                  <div className="flex flex-row gap-4 bg-blue-700">
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* This cannot collide. */}
          <div className="translate-y-48 pt-32 fixed">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-row gap-4">
                <textarea
                  className="textarea textarea-primary"
                  onChange={(e) => setQuery(e.target.value)}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import requests from "../utils/requests";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [resData, setResData] = useState([]);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchChatGPTResponse(query);
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
    <div className="flex flex-col items-center justify-center h-full gap-8 py-16">
      <h1>Home Page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Go to Intro
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setActive(!active)}
      >
        Fetch Data from Server
      </button>

      <form type="submit" onSubmit={handleSubmit}>
        <input onChange={(e) => setQuery(e.target.value)} />
      </form>

      {/* {active && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl text-pallete-purple-900">Server Data</p>
          {resData.map((data, index) => (
            <div
              className="flex flex-col items-center justify-center gap-4"
              key={index}
            >
              <h1 className="text-2xl text-green-700">{data.message}</h1>
              <p>Username: {data.username}</p>
              <p>Name: {data.name}</p>
              <div className="flex flex-col items-center justify-center gap-4">
                <img
                  src={data.image}
                  alt="github-pfp"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Home;

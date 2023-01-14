import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import requests from "../utils/requests";
import axios from "axios";
import Layout from "../components/Layout";

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
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center h-full gap-8 py-16">
          <h1 className="text-2xl text-pallete-purple-900">Home Page</h1>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary bg-pallete-purple-500"
          >
            Go to Intro
          </button>

          <form
            type="submit"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary input-lg w-full max-w-xs"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Home;

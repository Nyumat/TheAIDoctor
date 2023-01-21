import React from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import Layout from "../components/Layout";
import { useEffect } from "react";

const options = [
  { value: "Heart Disease", label: "Heart Disease" },
  { value: "Stroke", label: "Stroke" },
  { value: "Diabetes", label: "Diabetes" },
  { value: "Cancer", label: "Cancer" },
  { value: "Arthritis", label: "Arthritis" },
];

const controlStyles = {
  border: "1px solid black",
  padding: "5px",
  color: "white",
  background: "#806aef",
};

const IndicatorsContainer = (props) => {
  return (
    <div style={{ controlStyles }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

const addTags = (event) => {
  if (event.key === "Enter" && event.target.value !== "") {
    setTags([...tags, event.target.value]);
    event.target.value = "";
  }
};

const Settings = ({ conditions, setConditions }) => {
  return (
    <>
      <div className="  mx-10 px-10 w-3/4">
        <h1 className="flex items-center text-2xl justify-center text-center text-white pb-4">
          To help the AI Doctor answer your questions with a better precision,
          please let us know of any symptoms or health conditions you have at
          this time:{" "}
        </h1>
        <h1 className="flex items-center text-lg justify-center text-center text-pallete-purple-900">
          You can add more than one health condition.{" "}
        </h1>
      </div>
      <br></br>
      <Layout>
        <CreatableSelect
          closeMenuOnSelect={false}
          components={{ IndicatorsContainer }}
          defaultValue={conditions}
          isMulti
          options={options}
          placeholder="Enter your health conditions here."
          onKeyUp={(event) => addTags(event)}
          onChange={(event) => setConditions(event)}
          size="10rm"
        />
      </Layout>
    </>
  );
};

export default Settings;

import React from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import Layout from "../components/Layout";

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

const Settings = () => {
  return (
    <>
      <p className="flex items-center justify-center text-pallete-purple-900">
        To help the AI Doctor answer your questions with a better percision
        please let us know of any diseases you have at a time:{" "}
      </p>
      <br></br>
      <Layout>
        <CreatableSelect
          closeMenuOnSelect={false}
          components={{ IndicatorsContainer }}
          defaultValue={[options[5], options[5]]}
          isMulti
          options={options}
          placeholder="Press enter to add a disease"
          onKeyUp={(event) => addTags(event)}
          size="10rm"
        />
      </Layout>
    </>
  );
};

export default Settings;

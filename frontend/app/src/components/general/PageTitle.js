import React from "react";

const PageTitle = (props) => {
  return (
    <h2>
      {props.title}: {new Date().toLocaleString("en-US", { month: "long" })}{" "}
      {new Date().getFullYear()}
    </h2>
  );
};

export default PageTitle;

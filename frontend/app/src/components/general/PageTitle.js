import React from "react";
import './PageTitleStyle.css'

const PageTitle = (props) => {
  return (
    <h2 className="title">
      {props.title}: {new Date().toLocaleString("en-US", { month: "long" })}{" "}
      {new Date().getFullYear()}
    </h2>
  );
};

export default PageTitle;

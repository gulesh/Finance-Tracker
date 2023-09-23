import React from "react";

const TableTitle = (props) => {
  const classes = "card " + (props.className || "");
    return (
      <div className={classes}>
        <h2>
          {props.title}: {new Date().toLocaleString("en-US", { month: "long" })}{" "}
          {new Date().getFullYear()}
        </h2>
      </div>
    );
}

export default TableTitle;
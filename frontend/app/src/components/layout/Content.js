import React from "react";
import './ContentStyle.css'

const Content = ({open, children}) => {
    return (
      <div
        className="content"
        style={{ marginRight: open ? "240px" : "0", transition: "margin 0.3s" }}
      >
        {children}
      </div>
    );
}
export default Content;
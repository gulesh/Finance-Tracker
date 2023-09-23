import React from "react";
import './Main.css';

function Main(props)
{
     const classes = "main-container " + (props.className || "");
    return <main className={classes}>{props.children}</main>;
}


export default Main;
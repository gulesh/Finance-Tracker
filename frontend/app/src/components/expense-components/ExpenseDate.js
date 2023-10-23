import React from "react";

import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const date = new Date(props.date); // Convert the date string to a Date object

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;

/* source: https://github.com/academind/react-complete-guide-code/commits?author=maxschwarzmueller*/ 

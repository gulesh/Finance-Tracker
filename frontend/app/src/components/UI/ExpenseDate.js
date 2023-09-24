import React from "react";
import '../styles/ExpenseDate.css'

const ExpenseDate = (props) => {
     const month = props.date.getMonth() + 1;
     const day = props.date.toLocaleString("en-US", { day: "2-digit" });
     const year = props.date.getFullYear();
    return (
      <div className="expense-date ">
        {month}
        {"/"}
        {day}
        {"/"}
        {year}
      </div>
    );
}

export default ExpenseDate;
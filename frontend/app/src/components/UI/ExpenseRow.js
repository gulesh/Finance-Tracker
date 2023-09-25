import React from "react";
import '../styles/Expenses.css'
import "../styles/ExpenseDate.css";
import ExpenseDate from "./ExpenseDate";
import EditExpense from "../../utils/EditExpenses";
const ExpenseRow = (props) => {
  const category = props.data.category.name;
  const account = props.data.account.name;
  const amount = props.data.amount;
  const date = props.data.date;

  return (
    <>
      <div className="box">
        <ExpenseDate date={new Date(date)} />
      </div>
      <div className="box">
        <div className="expense-date">{category}</div>
      </div>
      <div className="box">
        <div className="expense-date"> {account} </div>
      </div>
      <div className="box">
        <div className="expense-date"> {amount}</div>
      </div>
      <div className="box">
        <div className="expense-date">
          <EditExpense styleclass="buttonStyle"/>
        </div>
      </div>
      <div className="box"> Delete </div>
    </>
  );
}

export default ExpenseRow;
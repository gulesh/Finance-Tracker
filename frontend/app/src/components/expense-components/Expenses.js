import React, { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../general/Card";
import './Expenses.css'
import ExpensesFilter from "./ExpensesFilter";
import MyContext from '../../MyContext';


const Expenses = ({ accounts, categories }) => {
  const { expenses } = useContext(MyContext);

  const [filteredYear, setFilteredYear] = useState("All");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  console.log(expenses);

  let expensesList = <p>No expenses found.</p>;

  if(expenses.length > 0)
  {
    expensesList = expenses.map((expense)=>(
        <ExpenseItem key={expense.id} expense={expense}/>
    ));
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {expensesList}
      </Card>
    </div>
  );
};

export default Expenses;
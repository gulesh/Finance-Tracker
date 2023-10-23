import React, { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../general/Card";
import './Expenses.css'
import ExpensesFilter from "./ExpensesFilter";
import MyContext from '../../MyContext';
import axios from "axios";

const Expenses = ({ accounts, categories }) => {
  const { expenses, updateExpenses } = useContext(MyContext);

  const [filteredYear, setFilteredYear] = useState("All");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const deleteExpenseById = async (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    updateExpenses(updatedExpenses);
    try {
      const response = await axios.delete(
        `http://localhost:8080/expenses/${encodeURIComponent(id)}`
      );
      if (response.status === 200) {
        console.log(
          `Successfully deleted category with id:  ${id}`
        );
      }
    } catch (e) {
      console.error("Error deleting the category: " + e);
    }
  };

  console.log(expenses);

  let expensesList = <p>No expenses found.</p>;

  if(expenses.length > 0)
  {
    expensesList = expenses.map((expense)=>(
        <ExpenseItem expense={expense} handleDeleteExpense={deleteExpenseById}/>
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
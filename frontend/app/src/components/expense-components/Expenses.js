import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../general/Card";
import './Expenses.css'
import ExpensesFilter from "./ExpensesFilter";
import { useExpenseQueries } from '../../queries/expenseQueries'


const Expenses = () => {

  const { useGetExpensesQuery }  = useExpenseQueries();
  const { data: expenses, isLoading, isError } = useGetExpensesQuery();

  const [filteredYear, setFilteredYear] = useState("All");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  console.log(expenses);

  let expensesList = <p>No expenses found.</p>;

  if (expenses && expenses.length > 0) {
    expensesList = expenses.map((expense) => (
      <ExpenseItem key={expense.id} expense={expense} />
    ));
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {(isLoading) && <p> Loading... </p>}
        {(isError) && <p> Error occured while loading </p>}
        {expenses && expensesList}
      </Card>
    </div>
  );
};

export default Expenses;
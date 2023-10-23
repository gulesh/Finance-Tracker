import React, { useState } from "react";
import AddExpense from "../components/forms/AddExpense";
import PageTitle from "../components/general/PageTitle";
import "../components/categorycomponents/CategoryStyles.css";
import { FiPlus } from "react-icons/fi";
import Expenses from "../components/expense-components/Expenses";

const Expense = ({accounts, categories}) => {
    const [isAddExpenseFormVisible, setIsAddExpenseFormVisible] = useState(false);

    const handlAddExpenseFormVisibility = ()=>{
        setIsAddExpenseFormVisible(!isAddExpenseFormVisible);
    }
    return (
      <div>
        <div className="page-header">
          <div className="page-header-content">
            <PageTitle title="Expenses" />
            <button
              onClick={handlAddExpenseFormVisibility}
              className="toggle-button-add-item"
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <div>
          {isAddExpenseFormVisible && (
            <AddExpense accounts={accounts} categories={categories} />
          )}
        </div>
        <div>
          <Expenses accounts={accounts} categories={categories} />
        </div>
      </div>
    );

    
}

export default Expense;
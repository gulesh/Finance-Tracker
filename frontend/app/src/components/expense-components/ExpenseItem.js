import React from 'react';
import Card from '../general/Card';
import './ExpenseItem.css'
import ExpenseDate from "./ExpenseDate";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from '../../utils/DeleteConfirmationDialog'
import { FiEdit } from "react-icons/fi";

const ExpenseItem = ({expense, handleDeleteExpense}) => {
    const navigate = useNavigate();
    const expenseId = expense.id;
    const accountName = expense.account.name;
    const amount = expense.amount;

    const categoryName = expense.category.name;
    const date = expense.date;
    const details = expense.details;

    const redirectToExpense = (expenseId) => {
      navigate(`/expenses/edit/${expenseId}`, {
        state: { categoryData: expense },
      });
    };

    const handleConfirmDelete = (expenseId) => {
      //make the api call
      if (expenseId !== null) {
        console.log(expenseId); 
        //call the delete method here
        console.log(handleDeleteExpense);
        //handleDeleteExpense(expenseId);
      }
    };

    return (
      <Card className="expense-item" key={expenseId}>
        <div className="expense-item__description">
          <ExpenseDate date={date} />
          <div className="details">
            <h2 data-tooltip="Category Name"> {categoryName}</h2>
            <h2 data-tooltip="Account Name"> {accountName} </h2>
            <h2 data-tooltip="Details"> {details === "" ? "---" : details} </h2>
          </div>

          <div className="expense-item__price">${amount}</div>
          <div className="edit-options">
            <button
              className="edit-button"
              onClick={() => {
                redirectToExpense(expenseId);
              }}
            >
              <FiEdit />
            </button>
            <DeleteConfirmationDialog
              onConfirmDelete={handleConfirmDelete}
              name={expenseId}
              type="expense"
            />
          </div>
        </div>
      </Card>
    );
}

export default ExpenseItem;
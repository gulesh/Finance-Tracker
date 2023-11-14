import React from 'react';
import Card from '../general/Card';
import './ExpenseItem.css'
import ExpenseDate from "./ExpenseDate";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from '../../utils/DeleteConfirmationDialog'
import { FiEdit } from "react-icons/fi";
import { useExpenseQueries } from '../../queries/expenseQueries';

const ExpenseItem = ({expense}) => {
    const { useDeleteExpenseQuery } = useExpenseQueries();
    const deleteExpenseMutation = useDeleteExpenseQuery();

    const navigate = useNavigate();
    const expenseId = expense.id;
    const accountName = expense.account.name;
    const amount = expense.amount;

    const categoryName = expense.category.name;
    const date = expense.date;
    const details = expense.details;

    const redirectToExpenseEdit = (id) => {
      console.log("expenseId Item: " + id);
      navigate(`/expenses/edit/${id}`, {
        state: { expenseData: expense },
      });
    };

    const handleConfirmDelete = (expenseId) => {
      //make the api call
      if (expenseId !== null) {
        console.log(expenseId); 
        //call the delete method here
        deleteExpenseById(expenseId);
      }
    };

    const deleteExpenseById = async (id) => {
      try 
      {
        const deletedExpense = await deleteExpenseMutation.mutateAsync(id);
        console.log(deletedExpense);
      } 
      catch (e) {
        console.error("Error deleting the category: " + e);
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
                redirectToExpenseEdit(expenseId);
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
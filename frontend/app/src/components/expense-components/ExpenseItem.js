import React , { useContext }from 'react';
import Card from '../general/Card';
import './ExpenseItem.css'
import ExpenseDate from "./ExpenseDate";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from '../../utils/DeleteConfirmationDialog'
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import MyContext from "../../MyContext";

const ExpenseItem = ({expense, handleDeleteExpense}) => {
    const { expenses, updateExpenses } = useContext(MyContext);
    const navigate = useNavigate();
    const expenseId = expense.id;
    const accountName = expense.account.name;
    const amount = expense.amount;

    const categoryName = expense.category.name;
    const date = expense.date;
    const details = expense.details;

    const redirectToExpense = (expenseId) => {
      navigate(`/expenses/edit/${expenseId}`, {
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
        console.log(id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      updateExpenses(updatedExpenses);
      console.log(updatedExpenses)
        try {
        const response = await axios.delete(
            `http://localhost:8080/expenses/${encodeURIComponent(id)}`
        );
        if (response.status === 200) {
            console.log(`Successfully deleted category with id:  ${id}`);
        }
        } catch (e) {
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
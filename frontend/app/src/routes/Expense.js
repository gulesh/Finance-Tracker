import React, { useState } from "react";
import AddExpense from "../components/forms/AddExpense";
import PageTitle from "../components/general/PageTitle";
import "../components/categorycomponents/CategoryStyles.css";
import { FiPlus } from "react-icons/fi";
import Expenses from "../components/expense-components/Expenses";
import { useCategoryQueries } from "../queries/categoryQueries";
import { useAccountQueries } from "../queries/accountQueries";

const Expense = () => {
    const [isAddExpenseFormVisible, setIsAddExpenseFormVisible] = useState(false);

    const handlAddExpenseFormVisibility = ()=>{
        setIsAddExpenseFormVisible(!isAddExpenseFormVisible);
    };

    const { useGetAccountsQuery } = useAccountQueries();
    const { useGetCategoriesQuery } = useCategoryQueries();

    const {data: accounts, isLoadingAcct, isErrorAcct} = useGetAccountsQuery();
    const {data: categories, isLoadingCat, isErrorCat} = useGetCategoriesQuery();
    
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
          {(isLoadingAcct || isLoadingCat) && <p> Loading... </p>}
          {(isErrorAcct || isErrorCat) && <p> Error occured while loading </p>}
          {isAddExpenseFormVisible && accounts && categories && (
            <AddExpense accounts={accounts} categories={categories} />
          )}
        </div>
        <div>
          {accounts && categories && (
            <Expenses accounts={accounts} categories={categories} />
          )}
        </div>
      </div>
    );

    
}

export default Expense;
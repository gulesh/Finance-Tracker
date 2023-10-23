import React, { useState, useCallback } from "react";
import MyContext from "./MyContext";

const MyContextProvider = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Use useCallback to memoize the update functions
  const updateAccounts = useCallback((data) => {
    setAccounts(data);
  }, []);

  const updateCategories = useCallback((data) => {
    setCategories(data);
  }, []);

  const updateTransfers = useCallback((data) => {
    setTransfers(data);
  }, []);

  const updateExpenses = useCallback((data) => {
    setExpenses(data);
  }, []);

  return (
    <MyContext.Provider
      value={{
        accounts,
        categories,
        transfers,
        expenses,
        updateAccounts,
        updateTransfers,
        updateCategories,
        updateExpenses,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;

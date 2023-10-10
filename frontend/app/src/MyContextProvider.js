import React, { useState, useCallback } from "react";
import MyContext from "./MyContext";

const MyContextProvider = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transfers, setTransfers] = useState([]);

  // Use useCallback to memoize the update functions
  const updateAccounts = useCallback((data) => {
    setAccounts(data);
  }, [setAccounts]);

  const updateCategories = useCallback((data) => {
    setCategories(data);
  }, [setCategories]);

  const updateTransfers = useCallback((data) => {
    setTransfers(data);
  }, [setTransfers]);

  return (
    <MyContext.Provider
      value={{
        accounts,
        categories,
        transfers,
        updateAccounts,
        updateTransfers,
        updateCategories
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;

import React, { useState, useCallback } from "react";
import MyContext from "./MyContext";

const MyContextProvider = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transfers, setTransfers] = useState([]);

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

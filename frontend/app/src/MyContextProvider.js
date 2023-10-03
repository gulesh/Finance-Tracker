import React, { useState, useCallback, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";

const MyContextProvider = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transfers, setTransfers] = useState([]);

  //fetch the data
  useEffect(() => {
    // Fetch data only on component mount
    const fetchData = async () => {
      try {
        const [accountsResponse, categoriesResponse, transfersResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/accounts/"),
            axios.get("http://localhost:8080/categories/"),
            axios.get("http://localhost:8080/transfers/"),
          ]);

        //Promise.all to fetch data for all collections in parallel, which can help reduce the number of requests being made simultaneously when the app loads.

        const accountsData = accountsResponse.data;
        const categoriesData = categoriesResponse.data;
        const transfersData = transfersResponse.data;

        updateAccounts(accountsData);
        updateCategories(categoriesData);
        updateTransfers(transfersData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array for initial fetch

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
        updateCategories,
        updateTransfers,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;

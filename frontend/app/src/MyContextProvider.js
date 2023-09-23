import React, {useState} from "react";
import { MyContext } from "./MyContext";

const MyContextProvider = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    //functions to set the states
    const updateAccounts= (data) => {
        setAccounts(data);
    }

    const updateCategories = (data) => {
      setCategories(data);
    };


    return (
    <MyContext.Provider value={{accounts, categories, updateAccounts, updateCategories}}>
        {props.children}
    </MyContext.Provider>
    );
}

export default MyContextProvider;
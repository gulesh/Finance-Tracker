import React, {useContext, useEffect, useState} from "react";

import MyContext from "../MyContext";
import axios from "axios";
import PageTitle from "../components/general/PageTitle";
import AddAccount from "../components/forms/AddAccount";
import SliderComponent from "../components/slider/Slider";
import '../components/categorycomponents/CategoryStyles.css'

const Account = () => {
    const {accounts,updateAccounts } = useContext(MyContext);
    const [isAddAccountFormVisible, setIsAddAccountFormVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/accounts/");
            const accountsData = response.data;
            updateAccounts(accountsData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
        };
        fetchData();
    }, [updateAccounts]);

    const handleAddAccountFormVisibility = () => {
        setIsAddAccountFormVisible(!isAddAccountFormVisible);
    }

    return (
      <>
        <div>
          <div className="page-header">
            <div className="page-header-content">
              <PageTitle title="Accounts" />
              <button
                onClick={handleAddAccountFormVisibility}
                className="toggle-button-category"
              >
                {isAddAccountFormVisible ? "▲" : "▼"}
              </button>
            </div>
          </div>
          {isAddAccountFormVisible && <AddAccount />}
          <SliderComponent accounts={accounts} />
        </div>
      </>
    );


}

export default Account;
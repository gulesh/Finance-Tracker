import React, { useState} from "react";
import PageTitle from "../components/general/PageTitle";
import AddAccount from "../components/forms/AddAccount";
import SliderComponent from "../components/slider/Slider";
import '../components/categorycomponents/CategoryStyles.css'
import { useAccountQueries } from '../queries/accountQueries'

const Account = () => {
    const [isAddAccountFormVisible, setIsAddAccountFormVisible] = useState(true);

    const handleAddAccountFormVisibility = () => {
        setIsAddAccountFormVisible(!isAddAccountFormVisible);
    }

    const { useGetAccountsQuery } = useAccountQueries();
    const {isLoading, isError, data: accounts} = useGetAccountsQuery();

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
          {isLoading && <p> Loading... </p>}
          {isError && <p> Error loading </p>}
          {accounts && <SliderComponent accounts={accounts} />}
        </div>
      </>
    );


}

export default Account;
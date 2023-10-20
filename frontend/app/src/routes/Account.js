import React, { useState} from "react";

import PageTitle from "../components/general/PageTitle";
import AddAccount from "../components/forms/AddAccount";
import SliderComponent from "../components/slider/Slider";
import '../components/categorycomponents/CategoryStyles.css'

const Account = ({accounts}) => {
    const [isAddAccountFormVisible, setIsAddAccountFormVisible] = useState(true);

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
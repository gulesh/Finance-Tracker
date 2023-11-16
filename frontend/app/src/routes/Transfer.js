import React, { useState } from "react";
import PageTitle from "../components/general/PageTitle";
import "../components/categorycomponents/CategoryStyles.css";
import { FiPlus } from "react-icons/fi";
import AddTransfer from "../components/forms/AddTransfer";
import { useTransferQueries } from "../queries/transferQueries";
import { useAccountQueries } from "../queries/accountQueries";
import Transfers from "../components/transfer-components/Transfers";

const Transfer = () =>{
    const [isAddTransferFormVisible, setIsAddTransferFormVisible] =
      useState(false);

    const handlAddExpenseFormVisibility = () => {
      setIsAddTransferFormVisible(!isAddTransferFormVisible);
    };

    const { useGetTransfersQuery } = useTransferQueries(); //get the query
    const { isLoading, data: transfers, isError } = useGetTransfersQuery();
    const { useGetAccountsQuery } = useAccountQueries();
    const { data: accounts } = useGetAccountsQuery();
    console.log(transfers);
    console.log(accounts);

    return (
      <div>
        <div className="page-header">
          <div className="page-header-content">
            <PageTitle title="Transfers" />
            <button
              onClick={handlAddExpenseFormVisibility}
              className="toggle-button-add-item"
            >
              <FiPlus />
            </button>
          </div>
        </div>
        {isAddTransferFormVisible && accounts &&  <AddTransfer accounts={accounts} />}
        {isLoading && <p> Loading... </p>}
        {isError && <p> Error loading </p>}
        {transfers && <Transfers transfers={transfers} />}
      </div>
    );

}

export default Transfer;
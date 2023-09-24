import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext"; 

import Main from '../components/layout/main/Main';
import FetchData from "../utils/FetchData";

const Accounts = () => {
    const { accounts, updateAccounts } = useContext(MyContext);
    const [fetchingData, setFetchingData] = useState(true);
    
    const handleDataFetch = ({ data, fetchState }) => {
      updateAccounts(data);
      setFetchingData(fetchState);
    };

    return (
      <Main>
        <FetchData
          sendDataToParent={handleDataFetch}
          apiFromParent="http://localhost:8080/accounts/"
          fetchState={fetchingData}
        />
        <div>
          {accounts.map((row) => (
            <div key= {row.id}>
                <h1> { row.name } </h1>
            </div>
          ))}
        </div>
      </Main>
    );
}

export default Accounts;
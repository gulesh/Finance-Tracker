import React, { useState } from "react";
import Main from '../components/layout/main/Main'
import FetchData from "../utils/FetchData";
import Container from "react-bootstrap/Container";


import '../components/styles/Expenses.css'
import ExpenseRow from "../components/UI/ExpenseRow";

const Expenses = () =>
{
    const [expenses, setExpenses] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);

    const handleDataFetch = ({ data, fetchState }) => {
      setExpenses(data);
      setFetchingData(fetchState);
    };

    return (
      <>
        <Main>
          <FetchData
            sendDataToParent={handleDataFetch}
            apiFromParent="http://localhost:8080/expenses/"
            fetchState={fetchingData}
          />
          <Container>
            <div className="container title">
              <h1> Expenses </h1>
            </div>
          </Container>
          {expenses.map((row) => (
            <div className="container" key={row.id}>
              <ExpenseRow data={row} />
            </div>
          ))}
        </Main>
      </>
    );
}

export default Expenses;
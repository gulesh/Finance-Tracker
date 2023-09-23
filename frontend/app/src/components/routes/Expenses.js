import React, { useState } from "react";
import Main from '../layout/main/Main'
import Card from '../layout/others/Card'
import FetchData from "../../utils/FetchData";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Expenses = () =>
{
    const [expenses, setExpenses] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);

    const handleDataFetch = ({ data, fetchState }) => {
      setExpenses(data);
      setFetchingData(fetchState);
      console.log(data);
      console.log("data fetched!");
      console.log(expenses);
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
            <Row className="justify-content-md-center">
              <Col md="auto">
                <h1> Expenses </h1>
              </Col>
            </Row>
          </Container>
          <Card>
            <div>
              {expenses.map((row) => (
                <div key={row.id}>
                  <h1> {row.category.name} </h1>
                </div>
              ))}
            </div>
          </Card>
        </Main>
      </>
    );
}

export default Expenses;
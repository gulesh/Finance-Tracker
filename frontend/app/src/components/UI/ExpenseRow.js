import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ExpenseRow = ({data}) => {
    console.log(data);
    return (
        <Container>
            <Row>
                {Object.entries(data).map(([key, value])=> (
                    key !== "id" && 
                    <Col>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ExpenseRow;
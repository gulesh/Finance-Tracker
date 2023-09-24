import React from "react";
import Main from '../components/layout/main/Main'
import Card from '../components/layout/others/Card'
import "../components/styles/Home.css";
import EditFormCategory from "../utils/EditFormCategory";

const HomePage = () => {
  const testData = {"name": "Simon", "worth": -10000, "oweMe": 10000, "interest": 20, "returned": true};
  return (
    <>
      <Main>
        <Card>
          <EditFormCategory data={testData}></EditFormCategory>
        </Card>
      </Main>
    </>
  );
};

export default HomePage;

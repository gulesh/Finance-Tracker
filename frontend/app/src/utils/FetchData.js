import axios from "axios";
import React, { useEffect } from "react";

const FetchData = ({ sendDataToParent, apiFromParent }) => {
  useEffect(() => {
    // Fetch data initially when the component mounts
    axios
      .get(apiFromParent)
      .then((response) => {
        const data = response.data;
        sendDataToParent({ data, fetchState: false }); // Set fetchState to false when data is successfully fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        sendDataToParent({ data: [], fetchState: false }); // Set fetchState to false on error
      });
  }, []);

  return null; // This component doesn't render anything
};

export default FetchData;

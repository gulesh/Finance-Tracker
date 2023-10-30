import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";

const MyReactErrorBoundry = ({ children }) => {

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);
      }}
      onReset={()=> window.location = "/"}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyReactErrorBoundry;
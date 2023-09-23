import React from "react";

const ErrorGenerator = () => {
  const throwError = () => {
    throw new Error("This is a test error!!!");
  };

  return (
    <div>
      <button onClick={throwError}>Generate Error</button>
    </div>
  );
};

export default ErrorGenerator;

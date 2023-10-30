import React from "react";

function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div>
      <p> Oops! Something went wrong.</p>
        <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}> Try Again </button>
    </div>
  );
};


export default ErrorPage;
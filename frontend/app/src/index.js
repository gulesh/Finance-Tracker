import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {QueryClient, QueryClientProvider} from'react-query'
import MyReactErrorBoundry from './MyReactErrorBoundry';

// const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Set staleTime to Infinity to prevent automatic refetching
    },
  },
});
//the UI is hidden under the error overlay as dev shows all error. Error boundry is useful in prod
function AppWithErrorBoundary() {
  return (
    <MyReactErrorBoundry>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MyReactErrorBoundry>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AppWithErrorBoundary />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

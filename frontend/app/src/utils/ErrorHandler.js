import React, { Component } from "react";
import ErrorPage from "../components/routes/ErrorPage";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null }; // Attribute to track errors
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error);
    console.error("Error Info:", errorInfo);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorHandler;

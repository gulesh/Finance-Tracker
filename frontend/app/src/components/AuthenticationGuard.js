import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import LandingPage from "../routes/Profile";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LandingPage />
    ),
  });

  return <Component />;
};

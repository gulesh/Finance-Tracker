import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from '../buttons/LoginButton'
import { LogoutButton } from "../buttons/LogoutButton";
import { SignupButton } from "../buttons/SignupButton";

const LandingPage = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
      <div className="profile">
        {user && <h1> {user.email }</h1> }
        {!isAuthenticated && (
          <>
            <SignupButton />
            <LoginButton />
          </>
        )}
        {isAuthenticated && (
          <>
            <LogoutButton />
          </>
        )}
      </div>
    );
}

export default LandingPage;
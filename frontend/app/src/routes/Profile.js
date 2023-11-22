import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from '../buttons/LoginButton'
import { LogoutButton } from "../buttons/LogoutButton";
import { SignupButton } from "../buttons/SignupButton";

const LandingPage = () => {
    const { isAuthenticated, user } = useAuth0();
     
    if (isAuthenticated) {
       const userEmail = user.email;
       const userId = user.sub;

       // Now you can use userEmail and userId in your application logic
       console.log("User Email:", userEmail);
       console.log("User ID:", userId);

       // ... rest of your component logic
     }

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
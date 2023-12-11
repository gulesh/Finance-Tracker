import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from '../buttons/LoginButton'
import { LogoutButton } from "../buttons/LogoutButton";
import { SignupButton } from "../buttons/SignupButton";
import axios from 'axios'
import { Avatar, Box, Container, Paper, Typography } from "@mui/material";

const Profile = () => {
    const [count , setCount] = useState(0);
    
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Perform the root request only on the first render
          console.log(isAuthenticated && count === 0);
          if (isAuthenticated && count === 0) {
            const token = await getAccessTokenSilently();
            const res = await axios.get("http://localhost:8080/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                userId: user?.sub,
              },
            });
            console.log(res.data);
            setCount(1); // Update count to prevent future re-renders from making additional requests
          }
        } catch (error) {
          console.error("Error making request:", error);
        }
      };
      if (isAuthenticated) {
        fetchData();
      }
    }, [isAuthenticated, count, user, getAccessTokenSilently]);

    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          {isAuthenticated && (
            <>
              <Avatar
                alt={user.name}
                src={user.picture}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h4" color="#40799d">
                Welcome,{" "}
                {user.given_name !== undefined ? ` ${user.given_name}!` : "!"}
              </Typography>
              <Paper sx={{ padding: "1rem", margin: "1rem" }}>
                <Typography
                  variant="h6"
                  color="#40799d"
                  sx={{ margin: "0.25rem" }}
                >
                  First Name :{" "}
                  {user.given_name !== undefined ? `${user.given_name}` : " "}
                </Typography>
                <Typography
                  variant="h6"
                  color="#40799d"
                  sx={{ margin: "0.25rem" }}
                >
                  Last Name :{" "}
                  {user.family_name !== undefined ? `${user.family_name}` : " "}
                </Typography>
                <Typography
                  variant="h6"
                  color="#40799d"
                  sx={{ margin: "0.25rem" }}
                >
                  Email : {user.email !== undefined ? `${user.email}` : " "}
                </Typography>
              </Paper>
              <LogoutButton />
            </>
          )}
          {!isAuthenticated && (
            <>
              <Typography
                variant="h4"
                color="primary"
                sx={{ margin: "0.25rem" }}
              >
                Welcome!
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                mt={2}
                sx={{ margin: "0.25rem" }}
              >
                If you are first time user, please sign up to access wonderful
                features of the app else login to continue using the app.
              </Typography>
              <p>
                <SignupButton />
                <LoginButton />
              </p>
            </>
          )}
        </Box>
      </Container>
    );
}

export default Profile;
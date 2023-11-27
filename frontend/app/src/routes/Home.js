import React from "react";
import { Box, Container,  Grid, Typography } from "@mui/material";
import CategoryBarChart from '../components/homecomponents/CategoryBarChart'
import AccountSummary from '../components/homecomponents/AccountsSummary'


const Home = () =>{
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid  item xs={8}>
            <CategoryBarChart />
          </Grid>
          <Grid item xs={4}>
            <AccountSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import logo from "./../../images/LibraryLogo.jpg";

const LibraryInfo = () => {
  return (
    <Box elevation={3} className="info-container">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5" className="section-title">
            Fabulous Books
          </Typography>
          <Box className="info-field">
            <Typography variant="subtitle1">Name: </Typography>
            <Typography variant="body1">Fabulous Books</Typography>
          </Box>
          <Box className="info-field">
            <Typography variant="subtitle1">Phone Number: </Typography>
            <Typography variant="body1">+381645287639</Typography>
          </Box>
          <Box className="info-field">
            <Typography variant="subtitle1">Email: </Typography>
            <Typography variant="body1">fab.books123@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="logo-container">
            <img src={logo} alt="Library Logo" className="library-logo" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibraryInfo;

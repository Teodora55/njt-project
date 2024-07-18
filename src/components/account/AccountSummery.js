import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";

const AccountSummery = () => {
  const { user } = useContext(UserContext);

  return (
    <Box elevation={3} className="info-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className="section-title">
            User Information
          </Typography>
          <Box className="info-field">
            <Typography variant="subtitle1">Firstname: </Typography>
            <Typography variant="body1">{user.customer.firstname}</Typography>
          </Box>
          <Box className="info-field">
            <Typography variant="subtitle1">Lastname: </Typography>
            <Typography variant="body1">{user.customer.lastname}</Typography>
          </Box>
          <Box className="info-field">
            <Typography variant="subtitle1">Email: </Typography>
            <Typography variant="body1">{user.customer.email}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountSummery;

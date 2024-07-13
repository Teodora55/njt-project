import React, { useContext, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import "./css/PaymentPage.css";
import { UserContext } from "../context/UserContext";

const PaymentPage = (props) => {
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = new URL("http://localhost:8080/user/membership");
    const response = await fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: user.username,
    });

    if (response.ok) {
      if (user.membershipExpiration) {
        const currentExpirationDate = new Date(user.membershipExpiration);
        currentExpirationDate.setFullYear(
          currentExpirationDate.getFullYear() + 1
        );
        setUser((prevUser) => ({
          ...prevUser,
          membershipExpiration: currentExpirationDate
            .toISOString()
            .split("T")[0],
        }));
        props.onChangeToAccountPage();
      } else props.onChangeToLoginPage();
    } else {
      setError("There is error with extending you membership!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Payment Page
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name on Card"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="card-element-container">
                <CardNumberElement className="card-element" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="card-element-container">
                <CardExpiryElement className="card-element" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="card-element-container">
                <CardCvcElement className="card-element" />
              </div>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Pay
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentPage;

import React from "react";
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
import "./../css/PaymentPage.css";
import Modal from "../modals/Modal";
import { usePayment } from "../hooks/PaymentHook";

const PaymentPage = (props) => {
  const {
    modalMessage,
    showMessageModal,
    handleSubmit,
    handleCloseMessageModal,
  } = usePayment(props);

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
      {showMessageModal && (
        <Modal onClose={handleCloseMessageModal}>
          <Typography variant="h6" className="message">
            {modalMessage}
          </Typography>
        </Modal>
      )}
    </Container>
  );
};

export default PaymentPage;

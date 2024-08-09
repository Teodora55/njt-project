import React from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import Modal from "../modals/Modal";
import { AccountInfoHook } from "../hooks/AccountInfoHook";

const AccountInfo = ({ onChangeToPaymentPage }) => {
  const {
    modalMessage,
    showMessageModal,
    user,
    handleChange,
    handleSubmit,
    isMembershipExpiringSoon,
    handleCloseMessageModal,
  } = AccountInfoHook();

  return (
    <form className="account-paper" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className="section-title">
            Personal Information
          </Typography>
          <Box className="field-container">
            <TextField
              name="username"
              label="Username"
              value={user.username}
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              name="firstname"
              label="Firstname"
              value={user.customer.firstname}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="lastname"
              label="Lastname"
              value={user.customer.lastname}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="email"
              label="Email"
              value={user.customer.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="jmbg"
              label="JMBG"
              value={user.customer.jmbg}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Box
              display="flex"
              alignItems="center"
              className="membership-container"
            >
              <TextField
                name="membershipExpiration"
                label="Membership Expiration"
                type="date"
                value={user.membershipExpiration}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {isMembershipExpiringSoon() && (
                <Button
                  variant="contained"
                  color="primary"
                  className="extend-button"
                  onClick={onChangeToPaymentPage}
                >
                  Extend Membership
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="update-button"
      >
        Update Information
      </Button>
      {showMessageModal && (
        <Modal onClose={handleCloseMessageModal}>
          <Typography variant="h6" className="message">
            {modalMessage}
          </Typography>
        </Modal>
      )}
    </form>
  );
};

export default AccountInfo;

import React, { useContext } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { UserContext } from "../../context/UserContext";

const AccountInfo = ({ onChangeToPaymentPage }) => {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (response.ok) {
      alert("User information updated successfully!");
    } else {
      alert("Failed to update user information.");
    }
  };

  const isMembershipExpiringSoon = () => {
    const expirationDate = new Date(user.membershipExpiration);
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(new Date().getMonth() + 1);
    return expirationDate <= oneMonthFromToday;
  };

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
    </form>
  );
};

export default AccountInfo;

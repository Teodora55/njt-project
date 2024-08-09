import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Grid,
} from "@mui/material";
import { AuthHook } from "../hooks/AuthHook";

const RegistrationForm = (props) => {
  const { newUser, error, handleRegistrationChange, handleSubmitRegistration } =
    AuthHook();

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={(e) => handleSubmitRegistration(e, props.onChangeToBookPage)}
        sx={{ mt: 3 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registration Form
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Firstname"
          name="firstname"
          value={newUser.firstname}
          onChange={(e) => handleRegistrationChange(e)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Lastname"
          name="lastname"
          value={newUser.lastname}
          onChange={(e) => handleRegistrationChange(e)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="JMBG"
          name="jmbg"
          value={newUser.jmbg}
          onChange={(e) => handleRegistrationChange(e)}
          required
          inputProps={{
            pattern: "\\d{13}",
            title: "JMBG must be exactly 13 digits",
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={newUser.email}
          onChange={(e) => handleRegistrationChange(e)}
          required
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={newUser.username}
          onChange={(e) => handleRegistrationChange(e)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          value={newUser.password}
          onChange={(e) => handleRegistrationChange(e)}
          required
          type="password"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={(e) => handleRegistrationChange(e)}
          required
          type="password"
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Link onClick={() => props.onLogin()}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegistrationForm;

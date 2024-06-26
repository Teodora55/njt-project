import React, { useState } from "react";
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

const RegistrationForm = (props) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      registerUser();
    }
  };

  const registerUser = async () => {
    const url = new URL("http://localhost:8080/login/register");
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(user),
      credentials: "include",
    });
    if (response.ok) {
      setError("Username is registered");
      props.onChangeToBookPage();
    } else {
      setError("Username is already used");
      setUser((prev) => ({
        ...prev,
        username: "",
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registration Form
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Firstname"
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Lastname"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="JMBG"
          name="jmbg"
          value={user.jmbg}
          onChange={handleChange}
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
          value={user.email}
          onChange={handleChange}
          required
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
          type="password"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
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

import React, { useContext, useState } from "react";
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
import { UserContext } from "../../context/UserContext";

const RegistrationForm = (props) => {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { setUser, setLogin } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
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
      body: JSON.stringify(newUser),
      credentials: "include",
    });
    if (response.ok) {
      setError("Username is registered");
      const data = await response.json();
      setUser(data);
      setLogin(true);
      props.onChangeToBookPage();
    } else {
      setError("Username is already used");
      setNewUser((prev) => ({
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
          value={newUser.firstname}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Lastname"
          name="lastname"
          value={newUser.lastname}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="JMBG"
          name="jmbg"
          value={newUser.jmbg}
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
          value={newUser.email}
          onChange={handleChange}
          required
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
          type="password"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          value={newUser.confirmPassword}
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

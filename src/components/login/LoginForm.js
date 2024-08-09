import React from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { AuthHook } from "../hooks/AuthHook";

const LoginForm = (props) => {
  const { loginData, error, handleLoginChange, handleSubmitLogin } = AuthHook();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={(e) =>
            handleSubmitLogin(
              e,
              props.onChangeToBookPage,
              props.onChangeToPaymentPage
            )
          }
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={loginData.username}
            onChange={handleLoginChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Link onClick={() => props.onRegistration()}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;

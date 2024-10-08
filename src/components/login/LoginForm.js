import React from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from "@mui/material";
import { useAuth } from "../hooks/AuthHook";
import Modal from "../modals/Modal";

const LoginForm = (props) => {
  const {
    loginData,
    showMessageModal,
    modalMessage,
    isValidInput,
    handleCloseMessageModal,
    handleLoginChange,
    handleSubmitLogin,
  } = useAuth();

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
            error={!isValidInput.username}
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
            error={!isValidInput.password}
          />
          {showMessageModal && (
            <Modal onClose={handleCloseMessageModal}>
              <Typography variant="h6" className="message">
                {modalMessage}
              </Typography>
            </Modal>
          )}
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

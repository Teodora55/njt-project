import React from "react";
import { Box, Typography, Button } from "@mui/material";

const RentBookModal = ({ message, availableRent, handleRent }) => {
  return (
    <Box className="modal-body">
      <Typography variant="h6" component="h2" className="modal-element">
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="modal-element"
        disabled={!availableRent}
        onClick={handleRent}
      >
        Rent
      </Button>
    </Box>
  );
};

export default RentBookModal;

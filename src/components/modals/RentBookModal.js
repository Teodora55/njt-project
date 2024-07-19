import React from "react";
import { Box, Typography, Button } from "@mui/material";

const RentBookModal = ({ message, availableRent, handleRent }) => {
  return (
    <Box>
      <Typography variant="h6" component="h2">
        {message}
      </Typography>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={!availableRent}
          onClick={handleRent}
        >
          Rent
        </Button>
      </Box>
    </Box>
  );
};

export default RentBookModal;

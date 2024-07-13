import React from "react";
import { Box } from "@mui/material";
import "./../css/MyAccount.css";
import AccountInfo from "./AccountInfo";

const MyAccount = ({ onChangeToPaymentPage }) => {
  return (
    <Box elevation={3} className="account-container">
      <AccountInfo onChangeToPaymentPage={onChangeToPaymentPage} />
    </Box>
  );
};

export default MyAccount;

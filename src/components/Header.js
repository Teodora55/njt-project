import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import "./css/Header.css";
import Modal from "./modals/Modal";
import NotificationModal from "./modals/NotificationModal";

const Header = (props) => {
  const { user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <AppBar position="static" className="appBar" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menuButton"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          My Bookshop
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" onClick={props.onChangeToBookPage}>
            Books
          </Button>
          {user && user.role === "ADMIN" && (
            <Button color="inherit" onClick={props.onChangeToCustomerPage}>
              Customers
            </Button>
          )}
          <Button color="inherit" onClick={props.onChangeToRentalPage}>
            Book Rentals
          </Button>
          <IconButton color="inherit" onClick={handleOpenModal}>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {openModal && (
        <Modal onClose={handleCloseModal}>
          <NotificationModal notifications={user.notifications} />
        </Modal>
      )}
    </AppBar>
  );
};

export default Header;

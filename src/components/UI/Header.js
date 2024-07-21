import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Modal from "../modals/Modal";
import NotificationModal from "../modals/NotificationModal";
import { Badge } from "@mui/material";
import logo from "./../../images/LibraryLogo.jpg";
import "./../css/Header.css";

const Header = (props) => {
  const { user, setUser, setLogin } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const logoutHandler = async () => {
    const url = new URL("http://localhost:8080/logout");
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("user");
      setUser(null);
      setLogin(false);
      props.onChangeToLoginPage();
    }
  };

  const openedNotificationsHandler = async (id) => {
    const response = await fetch(
      `http://localhost:8080/notify/received/${id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    if (response.ok) {
      user.notifications = user.notifications.map((notification) => {
        return notification.id === id
          ? { ...notification, received: true }
          : notification;
      });
    }
  };

  const unreadCount = user.notifications.filter(
    (notification) => !notification.received
  ).length;

  return (
    <AppBar position="static" className="appBar" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menuButton"
        >
          <img src={logo} alt="Library Logo" className="library-logo" />
        </IconButton>
        <Typography variant="h6" className="title">
          Fabulous Books...
        </Typography>
        <Box className="options">
          <Button color="inherit" onClick={props.onChangeToBookPage}>
            Books
          </Button>
          {user && user.role === "ADMIN" && (
            <Button color="inherit" onClick={props.onChangeToCustomerPage}>
              Customers
            </Button>
          )}
          {user && user.role === "USER" && (
            <Button color="inherit" onClick={props.onChangeToRentalPage}>
              Book Rentals
            </Button>
          )}
          {user && user.role === "USER" && (
            <Button
              color="inherit"
              startIcon={<AccountCircleIcon />}
              onClick={props.onChangeToAccountPage}
            >
              My Account
            </Button>
          )}
          <Button
            color="inherit"
            startIcon={<AutoStoriesOutlinedIcon />}
            onClick={props.onChangeToReadingPage}
          >
            Read
          </Button>
          <Button
            color="inherit"
            onClick={handleOpenModal}
            startIcon={
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            }
          >
            Notifications
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
      {openModal && (
        <Modal onClose={handleCloseModal}>
          <NotificationModal
            notifications={user.notifications}
            openedNotifications={openedNotificationsHandler}
          />
        </Modal>
      )}
    </AppBar>
  );
};

export default Header;

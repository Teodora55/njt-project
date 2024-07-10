import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const NotificationModal = ({ notifications }) => {
  return (
    <Box className="modal-body">
      <Typography variant="h6" className="modal-element">
        Notifications
      </Typography>
      <List id="notification-modal-description">
        {notifications.map((notification) => (
          <ListItem key={notification.id} className="modal-element">
            <ListItemText primary={notification.title} />
            <ListItemText primary={notification.message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotificationModal;

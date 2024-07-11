import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

const NotificationModal = ({ notifications, openedNotifications }) => {
  const [expanded, setExpanded] = useState({});
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleNotificationClick = (id) => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, received: true }
          : notification
      )
    );
    openedNotifications(id);
  };

  return (
    <Box className="modal-body">
      <Typography variant="h4" className="modal-element">
        Notifications
      </Typography>
      <List id="notification-modal-description">
        {localNotifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem
              className={`modal-element notification-list-item ${
                notification.received ? "" : "bold"
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <ListItemText
                primary={notification.title}
                primaryTypographyProps={{
                  variant: "h6",
                  component: "div",
                  className: `notification-title ${
                    notification.received ? "" : "bold"
                  }`,
                }}
              />
              <ListItemText
                primary={
                  <>
                    {notification.message.length < 60 ||
                    expanded[notification.id]
                      ? notification.message
                      : `${notification.message.substring(0, 60)}...`}
                    {notification.message.length > 60 && (
                      <Button
                        onClick={() => toggleExpand(notification.id)}
                        sx={{
                          marginLeft: "8px",
                          textTransform: "none",
                          padding: 0,
                          minHeight: 0,
                          minWidth: 0,
                        }}
                      >
                        {expanded[notification.id] ? "Show less" : "Read more"}
                      </Button>
                    )}
                  </>
                }
                primaryTypographyProps={{
                  variant: "body1",
                  component: "div",
                  className: `${notification.received ? "" : "bold"}`,
                }}
              />
            </ListItem>
            {index < localNotifications.length - 1 && (
              <Divider className="notification-divider" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NotificationModal;

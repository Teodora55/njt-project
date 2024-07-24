import { useContext, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";

const SendNotificationModal = ({
  customer,
  mode,
  onChange,
  onShowMessageModal,
}) => {
  const { user } = useContext(UserContext);
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    recipientId: customer ? customer.id : null,
    senderUsername: user.username,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (mode === "notify") notifyUserHandler();
    else if (mode === "notifyAll") notifyAllHandler();
  };

  const notifyUserHandler = async () => {
    const response = await fetch(`http://localhost:8080/notify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });
    onChange();
    if (response.ok) {
      onShowMessageModal("User successfully notified!");
    } else onShowMessageModal("There were error while notifying user!");
  };

  const notifyAllHandler = async () => {
    const response = await fetch(`http://localhost:8080/notify/all`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });
    onChange();
    if (response.ok) {
      onShowMessageModal("Users successfully notified!");
    } else onShowMessageModal("There were error while notifying users!");
  };

  return (
    <div className="modal-body">
      <form onSubmit={submitHandler}>
        <Typography variant="h6" className="modal-element">
          Notification
        </Typography>
        <TextField
          variant="outlined"
          label="Title"
          className="modal-element"
          value={notification.title}
          onChange={(e) =>
            setNotification((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          variant="outlined"
          label="Message"
          className="modal-element"
          value={notification.message}
          multiline
          rows={4}
          onChange={(e) =>
            setNotification((prev) => ({ ...prev, message: e.target.value }))
          }
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            className="modal-element"
            id="edit"
            sx={{ marginTop: "16px" }}
          >
            Notify
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendNotificationModal;

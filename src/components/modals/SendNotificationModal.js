import { useContext } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useSendNotification } from "../hooks/SendNotificationHook";

const SendNotificationModal = ({
  customer,
  mode,
  onChange,
  onShowMessageModal,
}) => {
  const { user } = useContext(UserContext);
  const { notification, isValidInput, setNotification, submitHandler } =
    useSendNotification(customer, user, onChange, onShowMessageModal);

  return (
    <div className="modal-body">
      <form onSubmit={(e) => submitHandler(e, mode)}>
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
          error={!isValidInput.title}
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
          error={!isValidInput.message}
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

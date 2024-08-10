import { useState } from "react";

export const SendNotificationHook = (
  customer,
  user,
  onChange,
  onShowMessageModal
) => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    recipientId: customer ? customer.id : null,
    senderUsername: user.username,
  });
  const [isValidInput, setIsValidInput] = useState({
    title: true,
    message: true,
  });

  const notifyUserHandler = async () => {
    if (!verifyNotification()) return;
    const response = await fetch(`http://localhost:8080/notify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });
    onChange();
    const data = await response.text();
    onShowMessageModal(data);
  };

  const notifyAllHandler = async () => {
    if (!verifyNotification()) return;
    const response = await fetch(`http://localhost:8080/notify/all`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });
    onChange();
    const data = await response.text();
    onShowMessageModal(data);
  };

  const verifyNotification = () => {
    const titleRegex = /^[a-zA-Z][a-zA-Z '-]{5,50}$/;
    const titleValid = titleRegex.test(notification.title);
    const messageValid = notification.message.length > 20;
    setIsValidInput({
      title: titleValid,
      message: messageValid,
    });
    return titleValid && messageValid;
  };

  const submitHandler = (event, mode) => {
    event.preventDefault();
    if (mode === "notify") notifyUserHandler();
    else if (mode === "notifyAll") notifyAllHandler();
  };

  return {
    notification,
    isValidInput,
    setNotification,
    submitHandler,
  };
};

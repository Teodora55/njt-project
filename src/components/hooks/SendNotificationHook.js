import { useState } from "react";
import { useFetchData } from "./FetchDataHook";

export const useSendNotification = (
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

  const { fetchData } = useFetchData();

  const notifyHandler = async (url) => {
    if (!verifyNotification()) return;
    const response = await fetchData({
      url: url,
      method: "POST",
      body: notification,
    });
    onChange();
    const data = await response.text();
    onShowMessageModal("There were error while notifying user!");
  };

  const verifyNotification = () => {
    const titleRegex = /^[a-zA-Z][a-zA-Z '-]{4,50}$/;
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
    let url;
    if (mode === "notify") url = `http://localhost:8080/notify`;
    else if (mode === "notifyAll") url = `http://localhost:8080/notify/all`;
    notifyHandler(url);
  };

  return {
    notification,
    isValidInput,
    setNotification,
    submitHandler,
  };
};

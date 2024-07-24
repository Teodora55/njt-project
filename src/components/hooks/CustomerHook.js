import { useCallback, useEffect, useReducer, useState } from "react";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFY_MODAL":
      return { mode: "notify", showing: true, customer: action.customer };
    case "SHOW_NOTIFY_ALL_MODAL":
      return { mode: "notifyAll", showing: true, customer: {} };
    case "CLOSE_MODAL":
      return { showing: false };
    default:
      return { mode: "", showing: false, customer: {} };
  }
};

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    mode: "",
    showing: false,
    customer: {},
  });

  const notifyCustomerHandler = (id) => {
    const customer = customers.find((el) => el.id === id);
    dispatchModal({ type: "SHOW_NOTIFY_MODAL", customer });
  };

  const notifyAllCustomersHandler = () => {
    dispatchModal({ type: "SHOW_NOTIFY_ALL_MODAL" });
  };

  const showMessageModalHandler = (message) => {
    setMessage(message);
    setShowMessageModal(true);
  };

  const closeMessageModalHandler = (message) => {
    setShowMessageModal(false);
  };

  const closeHandler = () => {
    dispatchModal({ type: "CLOSE_MODAL" });
  };

  const fillTable = useCallback(async () => {
    const response = await fetch("http://localhost:8080/customer/all", {
      credentials: "include",
    });
    if (response.ok) {
      setCustomers([]);
      const data = await response.json();
      setCustomers(
        data.map((item) => ({
          id: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
        }))
      );
    }
  }, []);

  useEffect(() => {
    fillTable();
  }, [fillTable]);

  const changeHandler = () => {
    closeHandler();
  };

  return {
    customers,
    filter,
    setFilter,
    modalState,
    showMessageModal,
    message,
    notifyCustomerHandler,
    notifyAllCustomersHandler,
    showMessageModalHandler,
    closeMessageModalHandler,
    closeHandler,
    changeHandler,
  };
};

export default useCustomers;

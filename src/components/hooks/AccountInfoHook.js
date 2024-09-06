import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useFetchData } from "./FetchDataHook";

export const useAccountInfo = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const { fetchData } = useFetchData();

  const handleChange = (e) => {
    const updateCustomer = {
      ...user.customer,
      [e.target.name]: e.target.value,
    };
    setUser((prevUser) => ({
      ...prevUser,
      customer: updateCustomer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validateCustomerInput();
    if (message !== "") handleOpenMessageModal(message);
    else {
      const response = await fetchData({
        url: `http://localhost:8080/user/update`,
        method: "PUT",
        body: user,
      });
      const data = await response.text();
      handleOpenMessageModal(data);
    }
  };

  const validateCustomerInput = () => {
    let message = "";

    const validatonRegex = {
      firstname: /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/,
      lastname: /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/,
      jmbg: /^\d{13}$/,
      email: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    };
    console.log(user.customer);
    Object.keys(user.customer).forEach((key) => {
      if (key === "id") return;
      if (!validateInput(user.customer[key], validatonRegex[key]))
        message += `${key} is not valid; `;
    });
    return message;
  };

  const validateInput = (input, regex) => {
    return regex.test(input);
  };

  const isMembershipExpiringSoon = () => {
    const expirationDate = new Date(user.membershipExpiration);
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1);
    return expirationDate <= oneMonthFromToday;
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const handleOpenMessageModal = (message) => {
    setShowMessageModal(true);
    setModalMessage(message);
  };

  return {
    modalMessage,
    showMessageModal,
    user,
    handleChange,
    handleSubmit,
    isMembershipExpiringSoon,
    handleCloseMessageModal,
    handleOpenMessageModal,
  };
};

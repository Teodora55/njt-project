import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const AccountInfoHook = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { user, setUser } = useContext(UserContext);

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
    const response = await fetch(`http://localhost:8080/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.text();
    handleOpenMessageModal(data);
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

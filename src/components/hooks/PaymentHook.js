import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const usePayment = (props) => {
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [changePage, setChangePage] = useState(() => () => {});

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = new URL("http://localhost:8080/user/membership");
    const response = await fetch(url, {
      method: "PUT",
      body: user.username,
    });
    const data = await response.text();
    handleOpenMessageModal(data);
    if (response.ok) {
      if (user.membershipExpiration) {
        const currentExpirationDate = new Date(user.membershipExpiration);
        currentExpirationDate.setFullYear(
          currentExpirationDate.getFullYear() + 1
        );
        setUser((prevUser) => ({
          ...prevUser,
          membershipExpiration: currentExpirationDate
            .toISOString()
            .split("T")[0],
        }));
        setChangePage(() => props.onChangeToAccountPage);
      } else setChangePage(() => props.onChangeToLoginPage);
    }
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    changePage();
  };

  const handleOpenMessageModal = (message) => {
    setShowMessageModal(true);
    setModalMessage(message);
  };

  return {
    modalMessage,
    showMessageModal,
    handleSubmit,
    handleCloseMessageModal,
  };
};

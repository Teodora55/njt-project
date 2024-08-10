import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const BookFilterHook = (
  fetchAuthors,
  fetchBookShelves,
  onFilterChange
) => {
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showBookshelfModal, setShowBookshelfModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useContext(UserContext);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange(name, checked);
  };

  const handleCloseModal = () => {
    setShowAuthorModal(false);
    setShowBookshelfModal(false);
    fetchAuthors();
    fetchBookShelves();
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const changeHandler = (message) => {
    handleCloseModal();
    setMessage(message);
    setShowMessageModal(true);
  };

  return {
    user,
    showAuthorModal,
    setShowAuthorModal,
    showBookshelfModal,
    setShowBookshelfModal,
    showMessageModal,
    setShowMessageModal,
    message,
    handleFilterChange,
    handleCloseModal,
    handleCloseMessageModal,
    changeHandler,
  };
};

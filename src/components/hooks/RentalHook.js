import { useState, useEffect } from "react";

export const RentalHook = () => {
  const [rentals, setRentals] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      const response = await fetch(`http://localhost:8080/rental/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setRentals(data);
      } else {
        console.error("Failed to fetch rentals");
      }
    };

    fetchRentals();
  }, []);

  const returnBookHandler = async (id) => {
    const response = await fetch("http://localhost:8080/rental/return", {
      method: "POST",
      body: id,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });
    if (response.ok) {
      setRentals((prev) => {
        const dateString = new Date().toISOString().split("T")[0];
        return prev.map((el) => {
          return el.id === id ? { ...el, returnedAt: dateString } : el;
        });
      });
    }
    const data = await response.text();
    handleOpenMessageModal(data);
  };

  const extendReturningDateHandler = async (id) => {
    const response = await fetch("http://localhost:8080/rental/extend", {
      method: "POST",
      body: id,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });
    if (response.ok) {
      const rental = rentals.find((r) => r.id === id);
      const newReturnByDate = new Date(rental.returnBy);
      newReturnByDate.setDate(newReturnByDate.getDate() + 14);
      setRentals((prev) => {
        return prev.map((el) => {
          return el.id === id
            ? {
                ...el,
                returnBy: newReturnByDate.toISOString().split("T")[0],
              }
            : el;
        });
      });
    }
    const data = await response.text();
    handleOpenMessageModal(data);
  };

  const handleReadBook = async (isbn) => {
    const url = `http://localhost:8080/rental/read/${isbn}`;
    window.open(url, "_blank");
  };

  const handleCloseMessageModal = () => setShowMessageModal(false);

  const handleOpenMessageModal = (message) => {
    setShowMessageModal(true);
    setModalMessage(message);
  };

  return {
    rentals,
    modalMessage,
    showMessageModal,
    returnBookHandler,
    extendReturningDateHandler,
    handleReadBook,
    handleCloseMessageModal,
  };
};

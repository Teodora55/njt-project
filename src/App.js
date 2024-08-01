import { useContext, useEffect, useState } from "react";
import CustomersTable from "./components/customer/CustomersTable.js";
import Header from "./components/UI/Header";
import RentalsTable from "./components/rentals/RentalsTable.js";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/login/RegistrationForm.js";
import LoginForm from "./components/login/LoginForm.js";
import { UserContext } from "./context/UserContext.js";
import BookPage from "./components/book/BookPage.js";
import PaymentPage from "./components/payment/PaymentPage.js";
import MyAccount from "./components/account/MyAccount.js";
import { Box, CircularProgress } from "@mui/material";
import "./components/css/App.css";
import "./components/css/ModalContent.css";

function App() {
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const { login, setLogin, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:8080/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setLogin(true);
        setPage("books");
      } else if (response.status === 406) {
        setPage("payment");
      }
      setLoading(false);
    };

    getUser();
  }, [setLogin, setUser]);

  const rentBookHandler = () => {
    setPage("rentals");
  };

  const bookHandler = () => {
    setPage("books");
  };

  const customerHandler = () => {
    setPage("customers");
  };

  const loginHandler = () => {
    setPage("");
  };

  const registerHandler = () => {
    setPage("register");
  };

  const paymentHandler = () => {
    setPage("payment");
  };

  const accountHandler = () => {
    setPage("account");
  };

  if (loading) {
    return (
      <Box className="load">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {login && (
        <Header
          onChangeToRentalPage={rentBookHandler}
          onChangeToBookPage={bookHandler}
          onChangeToCustomerPage={customerHandler}
          onChangeToAccountPage={accountHandler}
          onChangeToLoginPage={loginHandler}
        />
      )}
      <Box className="page-content">
        {page === "" && (
          <LoginForm
            onRegistration={registerHandler}
            onChangeToBookPage={bookHandler}
            onChangeToPaymentPage={paymentHandler}
          />
        )}
        {page === "register" && (
          <RegistrationForm
            onLogin={loginHandler}
            onChangeToBookPage={bookHandler}
          />
        )}
        {page === "books" && <BookPage />}
        {page === "rentals" && <RentalsTable />}
        {page === "customers" && <CustomersTable />}
        {page === "payment" && (
          <PaymentPage
            onChangeToLoginPage={loginHandler}
            onChangeToAccountPage={accountHandler}
          />
        )}
        {page === "account" && (
          <MyAccount onChangeToPaymentPage={paymentHandler} />
        )}
      </Box>
    </>
  );
}

export default App;

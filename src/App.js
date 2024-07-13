import { useContext, useState } from "react";
import CustomersTable from "./components/customer/CustomersTable.js";
import Header from "./components/Header";
import RentalsTable from "./components/RentalsTable";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/RegistrationForm.js";
import LoginForm from "./components/LoginForm.js";
import { UserContext } from "./context/UserContext.js";
import BookPage from "./components/book/BookPage.js";
import PaymentPage from "./components/PaymentPage.js";
import MyAccount from "./components/account/MyAccount.js";

function App() {
  const [page, setPage] = useState("");
  const { login } = useContext(UserContext);

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

  return (
    <>
      {login && (
        <Header
          onChangeToRentalPage={rentBookHandler}
          onChangeToBookPage={bookHandler}
          onChangeToCustomerPage={customerHandler}
          onChangeToAccountPage={accountHandler}
        />
      )}
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
    </>
  );
}

export default App;

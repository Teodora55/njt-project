import { useState } from "react";
import BooksTable from "./components/BooksTable.js";
import CustomersTable from "./components/CustomersTable";
import Header from "./components/Header";
import RentalsTable from "./components/RentalsTable";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/RegistrationForm.js";
import LoginForm from "./components/LoginForm.js";
import { UserProvider } from "./context/UserContext.js";

function App() {
  const [page, setPage] = useState("");

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

  return (
    <UserProvider>
      <Header
        onChangeToRentalPage={rentBookHandler}
        onChangeToBookPage={bookHandler}
        onChangeToCustomerPage={customerHandler}
      />
      {page === "" && (
        <LoginForm
          onRegistration={registerHandler}
          onChangeToBookPage={bookHandler}
        />
      )}
      {page === "register" && (
        <RegistrationForm
          onLogin={loginHandler}
          onChangeToBookPage={bookHandler}
        />
      )}
      {page === "books" && <BooksTable onRentBook={rentBookHandler} />}
      {page === "rentals" && <RentalsTable />}
      {page === "customers" && <CustomersTable />}
    </UserProvider>
  );
}

export default App;

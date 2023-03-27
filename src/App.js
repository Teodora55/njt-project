import { useState } from "react";
import BooksTable from "./components/BooksTable";
import CustomersTable from "./components/CustomersTable";
import Header from "./components/Header";
import RentalsTable from "./components/RentalsTable";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [page, setPage] = useState("books");

  const rentBookHandler = () => {
    setPage("rentals");
  };

  const bookHandler = () => {
    setPage("books");
  };

  const customerHandler = () => {
    setPage("customers");
  };

  return (
    <>
      <Header
        onChangeToRentalPage={rentBookHandler}
        onChangeToBookPage={bookHandler}
        onChangeToCustomerPage={customerHandler}
      />
      {page === "books" && <BooksTable onRentBook={rentBookHandler} />}
      {page === "rentals" && <RentalsTable />}
      {page === "customers" && <CustomersTable />}
    </>
  );
}

export default App;

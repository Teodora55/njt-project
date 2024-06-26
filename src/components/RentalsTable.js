import { useCallback, useEffect, useState } from "react";
import Rental from "./Rental";

const RentalsTable = () => {
  const [rentals, setRentals] = useState([]);

  const fillTable = useCallback(async () => {
    const response = await fetch("http://localhost:8080/rental", {
      credentials: "include",
    });
    if (response.ok) {
      setRentals([]);
      const data = await response.json();
      for (const key in data) {
        const rental = {
          id: data[key].id,
          book: data[key].bookCopy.book.name,
          isbn: data[key].bookCopy.isbn,
          customer:
            data[key].customer.firstname + " " + data[key].customer.lastname,
          customerId: data[key].customer.id,
          borrowedAt: data[key].borrowedAt,
          returnBy: data[key].returnBy,
          returnedAt: data[key].returnedAt,
        };
        setRentals((prev) => [...prev, rental]);
      }
    }
  }, []);

  useEffect(() => {
    fillTable();
  }, [fillTable]);

  const returnBookHandler = async (id, bookId, customerId) => {
    const response = await fetch(
      "http://localhost:8080/rental/customers/" +
        customerId +
        "/books/" +
        bookId +
        "/return",
      { method: "POST", credentials: "include" }
    );
    if (response.ok) {
      const data = await response.json();
      setRentals((prev) => {
        return prev.map((el) => {
          return el.id === id ? { ...el, returnedAt: data.returnedAt } : el;
        });
      });
    }
  };

  const extendReturningDateHandler = async (id, bookId, customerId) => {
    const response = await fetch(
      "http://localhost:8080/rental/customers/" +
        customerId +
        "/books/" +
        bookId +
        "/extend",
      { method: "POST", credentials: "include" }
    );
    if (response.ok) {
      const data = await response.json();
      setRentals((prev) => {
        return prev.map((el) => {
          return el.id === id ? { ...el, returnBy: data.returnBy } : el;
        });
      });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Book</th>
          <th scope="col">Customer</th>
          <th scope="col">Borrowed</th>
          <th scope="col">Return by</th>
          <th scope="col">Returned</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map((rental) => (
          <Rental
            key={rental.id}
            rental={rental}
            onReturnBook={() => {
              returnBookHandler(rental.id, rental.isbn, rental.customerId);
            }}
            onExtendReturningDate={() => {
              extendReturningDateHandler(
                rental.id,
                rental.isbn,
                rental.customerId
              );
            }}
          />
        ))}
      </tbody>
    </table>
  );
};

export default RentalsTable;

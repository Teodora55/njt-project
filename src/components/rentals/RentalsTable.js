import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Rental from "./Rental";

const RentalsTable = () => {
  const [rentals, setRentals] = useState([]);

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
      const data = await response.json();
      setRentals((prev) => {
        return prev.map((el) => {
          return el.id === id ? { ...el, returned: data.returned } : el;
        });
      });
    }
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
      const data = await response.json();
      setRentals((prev) => {
        return prev.map((el) => {
          return el.id === id ? { ...el, returnBy: data.returnBy } : el;
        });
      });
    }
  };

  return (
    <Table className="table">
      <TableHead>
        <TableRow>
          <TableCell scope="col">Book</TableCell>
          <TableCell scope="col">Author</TableCell>
          <TableCell scope="col">Borrowed</TableCell>
          <TableCell scope="col">Return by</TableCell>
          <TableCell scope="col">Returned</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rentals.map((rental) => (
          <Rental
            key={rental.id}
            rental={rental}
            onReturnBook={() => {
              returnBookHandler(rental.id);
            }}
            onExtendReturningDate={() => {
              extendReturningDateHandler(rental.id);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default RentalsTable;

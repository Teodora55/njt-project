import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Rental from "./Rental";
import "./../css/Rentals.css";

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
          return el.id === id ? { ...el, returnedAt: data.returnedAt } : el;
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

  const handleReadBook = async (isbn) => {
    const url = `http://localhost:8080/rental/read/${isbn}`;
    window.open(url, "_blank");
  };

  return (
    <Box className="table-container">
      <Table className="table">
        <TableHead className="table-header">
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
        <TableBody className="table-body">
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
              onRead={() => {
                handleReadBook(rental.bookCopy.isbn);
              }}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RentalsTable;

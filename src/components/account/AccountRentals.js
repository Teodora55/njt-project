import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import AccountRental from "./AccountRental";
import "./../css/AccountRentals.css";

const AccountRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const response = await fetch(`http://localhost:8080/rental`, {
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

  return (
    <Box className="rentals-container">
      <TableContainer component={Paper}>
        <Table className="ar-table">
          <TableHead>
            <TableRow>
              <TableCell className="title-col">Title</TableCell>
              <TableCell className="author-col">Author</TableCell>
              <TableCell className="borrowed-col">Borrowed</TableCell>
              <TableCell className="return-col">Return by</TableCell>
              <TableCell className="returned-col">Returned at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <AccountRental key={rental.id} rental={rental} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" className="date-text">
        {"Date: " + format(new Date(), "dd.MM.yyyy")}
      </Typography>
    </Box>
  );
};

export default AccountRentals;

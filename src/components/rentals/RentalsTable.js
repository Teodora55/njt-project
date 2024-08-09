import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import Rental from "./Rental";
import "./../css/Rentals.css";
import Modal from "../modals/Modal";
import { RentalHook } from "../hooks/RentalHook";

const RentalsTable = () => {
  const {
    rentals,
    modalMessage,
    showMessageModal,
    returnBookHandler,
    extendReturningDateHandler,
    handleReadBook,
    handleCloseMessageModal,
  } = RentalHook();

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
      {showMessageModal && (
        <Modal onClose={handleCloseMessageModal}>
          <Typography variant="h6" className="message">
            {modalMessage}
          </Typography>
        </Modal>
      )}
    </Box>
  );
};

export default RentalsTable;

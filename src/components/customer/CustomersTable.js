import React from "react";
import Customer from "./Customer";
import Modal from "../modals/Modal";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import useCustomers from "./../hooks/CustomerHook.js";
import "./../css/Customer.css";
import SendNotificationModal from "../modals/SendNotificationModal.js";

const CustomersTable = () => {
  const {
    customers,
    filter,
    setFilter,
    modalState,
    showMessageModal,
    message,
    notifyCustomerHandler,
    notifyAllCustomersHandler,
    showMessageModalHandler,
    closeMessageModalHandler,
    closeHandler,
    changeHandler,
  } = useCustomers();

  return (
    <Container className="container">
      <form>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Here"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 3 }}
        />
      </form>
      <Paper className="paper">
        <Table className="table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={notifyAllCustomersHandler}
                >
                  Notify all
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .filter(
                (el) =>
                  el.firstname.includes(filter) ||
                  el.lastname.includes(filter) ||
                  el.email.includes(filter)
              )
              .map((customer) => (
                <Customer
                  key={customer.id}
                  customer={customer}
                  onNotifyCustomer={() => notifyCustomerHandler(customer.id)}
                />
              ))}
          </TableBody>
        </Table>
      </Paper>
      {modalState.showing && (
        <Modal onClose={closeHandler}>
          <SendNotificationModal
            mode={modalState.mode}
            customer={modalState.customer}
            onChange={changeHandler}
            onShowMessageModal={showMessageModalHandler}
          />
        </Modal>
      )}
      {showMessageModal && (
        <Modal onClose={closeMessageModalHandler}>
          <Typography variant="h6" className="message">
            {message}
          </Typography>
        </Modal>
      )}
    </Container>
  );
};

export default CustomersTable;

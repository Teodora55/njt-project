import React from "react";
import Customer from "./Customer";
import CustomerModal from "../modals/CustomerModal";
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
    editCustomerHandler,
    addCustomerHandler,
    notifyCustomerHandler,
    notifyAllCustomersHandler,
    deleteCustomerHandler,
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
        <Table className="table" sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addCustomerHandler}
                >
                  Add
                </Button>
              </TableCell>
              <TableCell />
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
                  onEditCustomer={() => editCustomerHandler(customer.id)}
                  onDeleteCustomer={() => deleteCustomerHandler(customer.id)}
                  onNotifyCustomer={() => notifyCustomerHandler(customer.id)}
                />
              ))}
          </TableBody>
        </Table>
      </Paper>
      {modalState.showing &&
        (modalState.mode === "edit" || modalState.mode === "add") && (
          <Modal onClose={closeHandler}>
            <CustomerModal
              mode={modalState.mode}
              customer={modalState.customer}
              onChange={changeHandler}
            />
          </Modal>
        )}
      {modalState.showing &&
        (modalState.mode === "notify" || modalState.mode === "notifyAll") && (
          <Modal onClose={closeHandler}>
            <SendNotificationModal
              mode={modalState.mode}
              customer={modalState.customer}
              onChange={changeHandler}
            />
          </Modal>
        )}
    </Container>
  );
};

export default CustomersTable;

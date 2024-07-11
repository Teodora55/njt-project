import { Button, TableCell, TableRow } from "@mui/material";

const Customer = (props) => {
  return (
    <TableRow>
      <TableCell>{props.customer.id}</TableCell>
      <TableCell>{props.customer.firstname}</TableCell>
      <TableCell>{props.customer.lastname}</TableCell>
      <TableCell>{props.customer.email}</TableCell>
      <TableCell>
        <Button
          onClick={props.onEditCustomer}
          variant="contained"
          color="warning"
          className="open-AddBookDialog"
        >
          EDIT
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={props.onDeleteCustomer}
          variant="contained"
          color="error"
        >
          DELETE
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={props.onNotifyCustomer}
          variant="contained"
          color="secondary"
        >
          Notify
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Customer;

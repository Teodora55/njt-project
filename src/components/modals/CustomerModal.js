import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const CustomerModal = (props) => {
  const [customer, setCustomer] = useState(props.customer);

  const submitHandler = (event) => {
    event.preventDefault();
    if (props.mode === "edit") editCustomerHandler();
    else if (props.mode === "add") addCustomerHandler();
  };

  const editCustomerHandler = async () => {
    const response = await fetch(
      "http://localhost:8080/customer/" + customer.id,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(customer),
      }
    );
    if (response.ok) {
      props.onChange();
    }
  };

  const addCustomerHandler = async () => {
    const response = await fetch("http://localhost:8080/customer", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(customer),
    });
    if (response.ok) {
      props.onChange();
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={submitHandler}>
        <input type="hidden" name="id" value={customer.id} />
        <Typography variant="h6" className="modal-element">
          Customer Information
        </Typography>
        <TextField
          variant="outlined"
          label="Firstname"
          className="modal-element"
          value={customer.firstname}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, firstname: e.target.value }))
          }
        />
        <TextField
          variant="outlined"
          label="Lastname"
          className="modal-element"
          value={customer.lastname}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, lastname: e.target.value }))
          }
        />
        <TextField
          variant="outlined"
          label="Email"
          className="modal-element"
          value={customer.email}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <div>
          {props.mode === "add" && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="modal-element"
              id="add"
              sx={{ marginTop: "16px" }}
            >
              Add
            </Button>
          )}
          {props.mode === "edit" && (
            <Button
              type="submit"
              variant="contained"
              color="warning"
              className="modal-element"
              id="edit"
              sx={{ marginTop: "16px" }}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerModal;

import { useEffect, useRef, useState } from "react";
import Input from "../UI/Input";

const CustomerModal = (props) => {
  const [customer, setCustomer] = useState(props.customer);

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passportNumRef = useRef();

  const firstRender = useRef(true);

  const submitHandler = (event) => {
    event.preventDefault();
    setCustomer({
      ...customer,
      firstName: firstnameRef.current.inputValue,
      lastName: lastnameRef.current.inputValue,
      passportNum: passportNumRef.current.inputValue,
    });
  };

  const editCustomerHandler = async () => {
    const response = await fetch(
      "http://localhost:8080/spring/api/customer/" + customer.id,
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
    const response = await fetch("http://localhost:8080/spring/api/customer", {
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (props.mode === "edit") editCustomerHandler();
    else if (props.mode === "add") addCustomerHandler();
  }, [customer]);

  return (
    <div className="modal-body">
      <form onSubmit={submitHandler}>
        <input type="hidden" name="id" value={customer.id} />
        <Input
          ref={firstnameRef}
          label="Firstname"
          name="firstname"
          placeholder="Firstname"
          type="text"
          value={customer.firstName}
        />
        <Input
          ref={lastnameRef}
          label="Lastname"
          name="lastname"
          placeholder="Lastname"
          type="text"
          value={customer.lastName}
        />
        <Input
          ref={passportNumRef}
          label="Passport number"
          name="passportNum"
          placeholder="Passport number"
          type="text"
          value={customer.passportNum}
        />
        <div>
          {props.mode === "add" && (
            <button type="submit" id="add" className="btn btn-warning float-end">
              Add
            </button>
          )}
          {props.mode === "edit" && (
            <button type="submit" id="edit" className="btn btn-warning float-end">
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerModal;

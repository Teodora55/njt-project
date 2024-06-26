import { useCallback, useEffect, useState, useReducer } from "react";
import Customer from "./Customer";
import CustomerModal from "./modals/CustomerModal";
import Modal from "./modals/Modal";

const modalReducer = (state, action) => {
  if (action.type === "SHOW_EDIT_MODAL") {
    return {
      mode: "edit",
      showing: true,
      customer: action.customer,
    };
  }
  if (action.type === "SHOW_ADD_MODAL") {
    return {
      mode: "add",
      showing: true,
      customer: {},
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      showing: false,
    };
  }
  return { mode: "", showing: false, book: {} };
};

const CustomersTable = (props) => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    mode: "",
    showing: false,
    customer: {},
  });

  const editCustomerHandler = (id) => {
    const customer = customers.find((el) => {
      return el.id === id;
    });
    dispatchModal({ type: "SHOW_EDIT_MODAL", customer: customer });
  };

  const deleteCustomerHandler = async (id) => {
    const response = await fetch("http://localhost:8080/customer/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    }
  };

  const addCustomerHandler = () => {
    dispatchModal({ type: "SHOW_ADD_MODAL" });
  };

  const closeHandler = () => {
    dispatchModal({ type: "CLOSE_MODAL" });
  };

  const fillTable = useCallback(async () => {
    const response = await fetch("http://localhost:8080/customer/all", {
      credentials: "include",
    });
    if (response.ok) {
      setCustomers([]);
      const data = await response.json();
      for (const key in data) {
        const customer = {
          id: data[key].id,
          firstname: data[key].firstname,
          lastname: data[key].lastname,
          email: data[key].email,
        };
        setCustomers((prev) => [...prev, customer]);
      }
    }
  }, []);

  useEffect(() => {
    fillTable();
  }, [fillTable]);

  const changeHandler = () => {
    closeHandler();
    fillTable();
  };

  return (
    <>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search Here"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>
              <button
                onClick={addCustomerHandler}
                className="open-AddBookDialog-2 btn btn-primary"
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
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
                onEditCustomer={() => {
                  editCustomerHandler(customer.id);
                }}
                onDeleteCustomer={() => {
                  deleteCustomerHandler(customer.id);
                }}
              />
            ))}
        </tbody>
      </table>
      {modalState.showing && (
        <Modal onClose={closeHandler}>
          <CustomerModal
            mode={modalState.mode}
            customer={modalState.customer}
            onChange={changeHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default CustomersTable;

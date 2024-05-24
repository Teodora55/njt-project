const Customer = (props) => {
  return (
    <tr>
      <td>{props.customer.id}</td>
      <td>{props.customer.firstname}</td>
      <td>{props.customer.lastname}</td>
      <td>{props.customer.email}</td>
      <td>
        <button
          onClick={props.onEditCustomer}
          className="open-AddBookDialog btn btn-warning"
        >
          EDIT
        </button>
      </td>
      <td>
        <button onClick={props.onDeleteCustomer} className="btn btn-danger">
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default Customer;

const Rental = (props) => {
  return (
    <tr>
      <td>{props.rental.id}</td>
      <td>{props.rental.book}</td>
      <td>{props.rental.customer}</td>
      <td>{props.rental.borrowedAt}</td>
      <td>{props.rental.returnBy}</td>
      <td>{props.rental.returnedAt === null ? 'Not yet' : props.rental.returnedAt}</td>
      <td><button onClick={props.onReturnBook} className="open-AddBookDialog btn btn-warning">Return</button></td>
      <td><button onClick={props.onExtendReturningDate} className="btn btn-info">Extend returning date</button></td>
    </tr>
  );
};

export default Rental;

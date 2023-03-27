const Book = (props) => {;

  return (
    <tr>
      <td>{props.book.id}</td>
      <td>{props.book.name}</td>
      <td>{props.book.author}</td>
      <td>{props.book.isbn}</td>
      <td>{props.book.numPages}</td>
      <td>{props.book.genre}</td>
      <td><button onClick={props.onEditBook} className="open-AddBookDialog btn btn-warning">EDIT</button></td>
      <td><button onClick={props.onDeleteBook} className="btn btn-danger">DELETE</button></td>
      <td><button onClick={props.onRentBook} className="btn btn-info">RENT</button></td>
    </tr>
  );
};

export default Book;

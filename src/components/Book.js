const Book = (props) => {
  let author = "";
  props.book.author.forEach((a) => {
    author += a.lastname + " " + a.firstname + ", ";
  });

  return (
    <tr>
      <td>{props.book.id}</td>
      <td>{props.book.name}</td>
      <td>{author}</td>
      <td>{props.book.price}</td>
      <td>{props.book.genre}</td>
      <td>
        <button
          onClick={props.onEditBook}
          className="open-AddBookDialog btn btn-warning"
        >
          EDIT
        </button>
      </td>
      <td>
        <button onClick={props.onDeleteBook} className="btn btn-danger">
          DELETE
        </button>
      </td>
      <td>
        <button onClick={props.onRentBook} className="btn btn-info">
          RENT
        </button>
      </td>
    </tr>
  );
};

export default Book;

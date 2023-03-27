import { useEffect, useRef, useState } from "react";
import Input from "../UI/Input";

const EditBookModal = (props) => {
  const [book, setBook] = useState(props.book);
  const [select, setSelect] = useState(book.genre);

  const isbnRef = useRef();
  const nameRef = useRef();
  const authorRef = useRef();
  const numpagesRef = useRef();

  const firstRender = useRef(true);

  const submitHandler = (event) => {
    event.preventDefault();
    setBook({
      ...book,
      isbn: isbnRef.current.inputValue,
      name: nameRef.current.inputValue,
      author: authorRef.current.inputValue,
      numPages: numpagesRef.current.inputValue,
      genre: select,
    });
  };

  const editBookHandler = async () => {
    console.log(book);
    const response = await fetch(
      "http://localhost:8080/spring/api/book/" + book.id,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(book),
      }
    );
    if (response.ok) {
      props.onChange();
    }
  };

  const addBookHandler = async () => {
    console.log(book);
    const response = await fetch("http://localhost:8080/spring/api/book", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
    });
    if (response.ok) {
      props.onChange();
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (props.mode === "edit") editBookHandler();
    else if (props.mode === "add") addBookHandler();
  }, [book]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="hidden" name="id" value={book.id} />
        <Input
          ref={isbnRef}
          label="ISBN"
          name="isbn"
          placeholder="ISBN"
          type="text"
          value={book.isbn}
        />
        <Input
          ref={nameRef}
          label="Name"
          name="name"
          placeholder="Name"
          type="text"
          value={book.name}
        />
        <Input
          ref={authorRef}
          label="Author"
          name="author"
          placeholder="Author"
          type="text"
          value={book.author}
        />
        <Input
          ref={numpagesRef}
          label="Number of pages"
          name="numpages"
          placeholder="Number of pages"
          type="number"
          value={book.numPages}
        />
        <div>
          <label>Genre</label>
          <select
            name="genre"
            value={select}
            onChange={(event) => {
              setSelect(event.target.value);
            }}
          >
            <option value="ADVENTURE">Adventure</option>
            <option value="COMEDY">Comedy</option>
            <option value="HORROR">Horror</option>
            <option value="ACTION">Action</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="CLASSIC">Classic</option>
            <option value="FANTASY">Fantasy</option>
            <option value="CRIME">Crime</option>
          </select>
        </div>
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

export default EditBookModal;

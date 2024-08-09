import { Button, TableCell, TableRow } from "@mui/material";

const Rental = ({ rental, onReturnBook, onExtendReturningDate, onRead }) => {
  return (
    <TableRow>
      <TableCell onClick={onRead}>{rental.bookCopy.book.name}</TableCell>
      <TableCell>
        {rental.bookCopy.book.authors.map(
          (a) => `${a.firstname} ${a.lastname}\n`
        )}
      </TableCell>
      <TableCell>{rental.borrowedAt}</TableCell>
      <TableCell>{rental.returnBy}</TableCell>
      <TableCell>
        {rental.returnedAt === null ? "Not yet" : rental.returnedAt}
      </TableCell>
      <TableCell>
        <Button
          onClick={onReturnBook}
          variant="contained"
          color="info"
          disabled={rental.returnedAt !== null}
        >
          Return
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={onExtendReturningDate}
          variant="contained"
          color="error"
          disabled={rental.returnedAt !== null}
        >
          Extend returning date
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Rental;

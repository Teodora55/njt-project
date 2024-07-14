import { Button, TableCell, TableRow } from "@mui/material";

const Rental = ({ rental, onReturnBook, onExtendReturningDate }) => {
  return (
    <TableRow>
      <TableCell>{rental.name}</TableCell>
      <TableCell>{rental.author.map((a) => a + "\n")}</TableCell>
      <TableCell>{rental.borrowed}</TableCell>
      <TableCell>{rental.returnBy}</TableCell>
      <TableCell>
        {rental.returned === null ? "Not yet" : rental.returned}
      </TableCell>
      <TableCell>
        <Button
          onClick={onReturnBook}
          variant="contained"
          color="info"
          disabled={rental.returned !== null}
        >
          Return
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={onExtendReturningDate}
          variant="contained"
          color="error"
          disabled={rental.returned !== null}
        >
          Extend returning date
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Rental;

import { TableCell, TableRow } from "@mui/material";

const AccountRental = ({ rental }) => {
  return (
    <TableRow key={rental.id}>
      <TableCell>{rental.bookCopy.book.name}</TableCell>
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
    </TableRow>
  );
};

export default AccountRental;

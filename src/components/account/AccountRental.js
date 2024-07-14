import { TableCell, TableRow } from "@mui/material";

const AccountRental = ({ rental }) => {
  return (
    <TableRow>
      <TableCell>{rental.name}</TableCell>
      <TableCell>{rental.author.map((a) => a + "\n")}</TableCell>
      <TableCell>{rental.borrowed}</TableCell>
      <TableCell>{rental.returnBy}</TableCell>
      <TableCell>
        {rental.returned === null ? "Not yet" : rental.returned}
      </TableCell>
    </TableRow>
  );
};

export default AccountRental;

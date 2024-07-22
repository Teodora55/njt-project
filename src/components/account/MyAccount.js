import React, { useRef } from "react";
import { Box, Button, Grid } from "@mui/material";
import AccountInfo from "./AccountInfo";
import AccountRentals from "./AccountRentals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LibraryInfo from "./LibraryInfo";
import AccountSummery from "./AccountSummery";
import "./../css/MyAccount.css";
import "./../css/Pdf.css";

const MyAccount = ({ onChangeToPaymentPage }) => {
  const rentalsRef = useRef();

  const handleGetPdf = async () => {
    const input = rentalsRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("my-rentals.pdf");
  };

  return (
    <Grid container spacing={3} className="account-grid">
      <Grid item xs={8} md={4}>
        <AccountInfo onChangeToPaymentPage={onChangeToPaymentPage} />
      </Grid>
      <Grid item xs={16} md={8}>
        <Box ref={rentalsRef}>
          <LibraryInfo />
          <AccountSummery />
          <AccountRentals />
        </Box>
        <Button
          variant="contained"
          color="primary"
          className="get-pdf-button"
          onClick={handleGetPdf}
        >
          Get PDF
        </Button>
      </Grid>
    </Grid>
  );
};

export default MyAccount;

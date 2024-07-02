import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const BookGrid = ({ books }) => {
  return (
    <Grid container spacing={3} className="book-grid">
      {books.map((book) => (
        <Grid item key={book.id} xs={6} sm={4} md={3} className="book-block">
          <Card>
            <CardMedia
              component="img"
              alt={book.name}
              height="140"
              image={book.coverUrl}
              title={book.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="book-name"
              >
                {book.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Rating,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const ResultCard = (props) => {
  const { title, price, rating, source, thumbnail, link } = props.product;

  return source.length < 20 ? (
    <Card
      sx={{
        display: "flex",
        margin: 1,
        boxShadow: "none",
        border: "1px solid lightGrey",
        padding: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <CardContent>
          <Typography>{title}</Typography>
          <Typography>{price}</Typography>
          <div>
            <a href={link}>{source} </a>
          </div>

          <Rating
            sx={{ paddingTop: 2 }}
            name="simple-controlled"
            value={rating}
            readOnly
          />
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        image={thumbnail}
        sx={{ width: 150, height: 150 }}
      />
    </Card>
  ) : null 
}


const ResultsPage = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <Box mt={6} color="black">
      {location.state.shopping_results.map((product) => (
        <ResultCard product={product} />
      ))}
    </Box>
  );
};

export default ResultsPage;

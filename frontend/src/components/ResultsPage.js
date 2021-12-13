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
  ) : null;
};

const UserUpload = ({ imageLabel, uploadedImage }) => {
  return (
    <Box width="30%" padding={1}>
      <img style={{ width: "100%" }} src={uploadedImage} alt="failure" />
      <Box>Our best guess: {imageLabel}</Box>
    </Box>
  );
};

const ResultsPage = () => {
  const location = useLocation();

  const {
    resData: { searchResult, imageLabel },
    uploadedImage,
  } = location.state;

  return (
    <Box sx={{ marginTop: 6, display: "flex", width: "100%" }} color="black">
      <UserUpload imageLabel={imageLabel} uploadedImage={uploadedImage} />
      {searchResult.error ? (
        <Box height="93vh" width="100%" justifyContent="center">
          No results found
        </Box>
      ) : (
        <Box height="93vh" overflow="auto">
          {searchResult.shopping_results.map((product, i) => (
            <ResultCard key={i} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultsPage;

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
    <div
      style={{
        paddingTop: 10,
        flexWrap: "wrap",
        display: "inline-block",
      }}
    >
      <Card
        sx={{
          margin: 1,
          boxShadow: "none",
          border: "1px solid lightGrey",
          padding: 1,
          width: 460,
          height: 300,
          display: "flex",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "70%",
            height: "50%",
            paddingTop: 5,
          }}
        >
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
          sx={{
            width: 190,
            height: 250,
            paddingTop: 5,
            paddingLeft: 3,
            paddingRight: 3,
          }}
        />
      </Card>
    </div>
  ) : null;
};

const UserUpload = ({ imageLabel, uploadedImage }) => {
  return (
    <Box
      width="150%"
      paddingTop={3}
      borderRadius="15px"
      borderWidth={10}
      height="50%"
    >
      <img
        style={{
          width: "70%",
        }}
        src={uploadedImage}
        alt="failure"
      />
      <Box> ({imageLabel})</Box>
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
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        width: "100%",
      }}
      color="black"
    >
      <UserUpload imageLabel={imageLabel} uploadedImage={uploadedImage} />
      {searchResult.error ? (
        <Box height="93vh" width="100%" justifyContent="center">
          No results found
        </Box>
      ) : (
        <Box
          height="100vh"
          overflow="auto"
          width="500%"
          backgroundColor="lightgray"
        >
          {searchResult.shopping_results.map((product, i) => (
            <ResultCard key={i} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultsPage;

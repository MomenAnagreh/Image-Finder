import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Rating,
  TextField,
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
          width: { md: 460, sm: 250, xs: 250 },
          height: { md: 300, sm: 360, xs: 360 },
          display: {md: "flex", sm: "flex-column", xs: "flex-column"},
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "50%",
            paddingTop: { md: 5, sm: 0, xs: 0 },
            justifyContent: "center"
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
            maxHeight: "100%",
            maxWidth: "100%",
        
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

export const SearchBar = ({ setSearch }) => {
  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      <TextField
        placeholder="Search products.."
        onChange={(e) => setSearch(e.target.value)}
        sx={{ padding: 1, paddingRight: 3 }}
      />
    </Box>
  );
};

const ResultsPage = () => {
  const location = useLocation();

  const {
    resData: { searchResult, imageLabel },
    uploadedImage,
  } = location.state;

  const [searchStr, setSearchStr] = useState("");
  const unfilteredProducts = searchResult ? searchResult.shopping_results : [];
  const filteredProducts = unfilteredProducts.filter((p) =>
    p.source.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <Box
      sx={{
        marginTop: 6,
        display:{md: "flex", sm: "flex-column", xs: "flex-column"},
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
          <SearchBar setSearch={setSearchStr} />
          <Box height="93vh" overflow="auto">
            {filteredProducts.map((product, i) => (
              <ResultCard key={i} product={product} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResultsPage;

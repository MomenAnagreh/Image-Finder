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
    <Box sx={{ marginTop: 6, display: "flex", width: "100%" }} color="black">
      <UserUpload imageLabel={imageLabel} uploadedImage={uploadedImage} />
      {searchResult.error ? (
        <Box height="93vh" width="100%" justifyContent="center">
          No results found
        </Box>
      ) : (
        <Box display="flex-column" width="100%" height="93vh">
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

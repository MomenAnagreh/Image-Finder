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
import { Sort } from "./Sort";

const ResultCard = (props) => {
  const { title, price, rating, source, thumbnail, link } = props.product;

  return source.length < 20 ? (
    <div
      style={{
        paddingTop: 5,
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
          width: { md: 460, sm: 250, xs: 300 },
          height: { md: 350, sm: 360, xs: 360 },
          display: { md: "flex", sm: "flex-column", xs: "flex-column" },
          borderRadius: "15px",
          backgroundColor: { md: "white", xs: "#e6e6e6" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "35%",
            height: "100%",
            // paddingTop: { md: 5, sm: 0, xs: 0 },
            // justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
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
            height: { md: "60%", sm: "50%", xs: "50%" },
            width: "65%",
          }}
        />
      </Card>
    </div>
  ) : null;
};

const UserUpload = ({ imageLabel, uploadedImage }) => {
  return (
    <Box
      sx={{
        width: { md: "80%", sm: "50%", xs: "100%" },
        paddingTop: 3,
        borderRadius: "15px",
        borderWidth: 10,
        height: "50%",
      }}
    >
      <img
        style={{
          width: "50%",
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
    <Box display="flex" justifyContent="flex-end">
      <TextField
        placeholder="Search products.."
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          padding: 2,
          paddingRight: 3,
        }}
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

  const [sortStr, setSortStr] = useState(1);
  let sortedResult = searchResult.shopping_results;

  const [searchStr, setSearchStr] = useState("");

  if (!Array.isArray(searchResult.shopping_results)) {
    return <div style={{ color: "black" }}>No results found</div>;
  }
  searchResult.shopping_results.map((h) =>
    h.hasOwnProperty("rating") ? 1 : (h.rating = 0)
  );
  searchResult.shopping_results.map((h) =>
    h.price.slice(0, 3) === "IDR"
      ? (h.price =
          "$" +
          Math.ceil(
            Number(h.price.slice(3, 17).split(",").join("") / 14377.94)
          ))
      : null
  );

  sortStr === 1
    ? (sortedResult = searchResult.shopping_results.sort((a, b) =>
        a.extracted_price > b.extracted_price ? 1 : -1
      ))
    : sortStr === 2
    ? (sortedResult = searchResult.shopping_results.sort((a, b) =>
        a.extracted_price < b.extracted_price ? 1 : -1
      ))
    : (sortedResult = searchResult.shopping_results.sort((a, b) =>
        a.rating < b.rating ? 1 : -1
      ));

  const unfilteredProducts = searchResult ? sortedResult : [];
  const filteredProducts = unfilteredProducts.filter((p) =>
    p.source.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <Box
      sx={{
        marginTop: 6,
        display: { md: "flex", sm: "flex-column", xs: "flex-column" },
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
          sx={{
            height: "100vh",
            overflow: "auto",
            width: "100%",
            backgroundColor: { md: "#e6e6e6", sm: "white", xs: "white" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "7.1%",
              paddingRight: 2.5,
            }}
          >
            <Sort
              item1="Price: Low to High"
              item2="Price: high to low"
              item3="By Rating"
              setSort={setSortStr}
            />
            <SearchBar setSearch={setSearchStr} />
          </Box>
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

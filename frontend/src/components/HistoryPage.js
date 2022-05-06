import React, { useEffect, useState } from "react";
import { useGetHistory } from "../api";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { onFileResize } from "../ImageResize";
import { useNavigate } from "react-router-dom";
import { useUploadImage } from "../api";
import { dataURLtoBlob } from "./Cam";
import { SearchBar } from "./ResultsPage";
import { Sort } from "./Sort";

const HistoryCard = ({ historyItem, uploadImage }) => {
  const { item_image, item_name, search_time } = historyItem;
  const b64Str = `data:image/jpeg;base64,${item_image}`;

  const navigate = useNavigate();
  const handleSearchAgain = () => {
    onFileResize({ file: dataURLtoBlob(b64Str), navigate, uploadImage });
  };

  return (
    <Card
      sx={{
        display: "flex",
        margin: 1,
        boxShadow: "none",
        border: "1px solid lightGrey",
        padding: 1,
        maxHeight: 300,
        borderRadius: "15px",
        width: 440,
        height: 440,
        marginLeft: 3,
        backgroundColor: "#e6e6e6",
      }}
    >
      <CardMedia
        image={b64Str}
        component="img"
        sx={{
          width: "45%",
          borderRadius: "15px",
          display: "flex",
        }}
      />
      <Box
        sx={{
          flex: 1,
          flexDirection: "column",
          // width: "10%",
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0px 8px 0px 8px",
          }}
        >
          <Typography variant="h5">{item_name}</Typography>
          <Typography>Time Searched: {search_time}</Typography>
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={handleSearchAgain}
            sx={{ marginTop: 1 }}
          >
            Search Again
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

const HistoryPage = () => {
  const { loading, getHistory } = useGetHistory();
  const [historyData, setHistoryData] = useState([]);
  const uploadImage = useUploadImage();

  useEffect(() => {
    const fetch = async () => {
      const res = await getHistory();
      if (res) {
        setHistoryData(res.data);
      }
    };
    fetch();
  }, []);

  const [sortStr, setSortStr] = useState(3);
  let sortedHistory = null;

  sortStr === 1
    ? (sortedHistory = historyData.sort((a, b) =>
        a.item_name.toLowerCase() > b.item_name.toLowerCase() ? 1 : -1
      ))
    : sortStr === 2
    ? (sortedHistory = historyData.sort((a, b) =>
        a.item_name.toLowerCase() < b.item_name.toLowerCase() ? 1 : -1
      ))
    : sortStr === 3
    ? (sortedHistory = historyData.sort((a, b) =>
        a.search_time < b.search_time ? 1 : -1
      ))
    : (sortedHistory = historyData.sort((a, b) =>
        a.search_time > b.search_time ? 1 : -1
      ));

  const [searchStr, setSearchStr] = useState("");
  const filteredHistory = sortedHistory
    .reverse()
    .filter((p) =>
      p.item_name?.toLowerCase()?.includes(searchStr.toLowerCase())
    );

  return loading || uploadImage.loading ? (
    <CircularProgress size={75} />
  ) : (
    <Box color="black" width="100%" marginTop={6}>
      <Box
        display="flex"
        alignItems="center"
        position="fixed"
        width="99%"
        backgroundColor="white"
        zIndex={99}
        height={80}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { md: 32, xs: 23 },
            fontFamily: "inherit",
            fontWeight: 700,
            marginTop: 5,
            marginBottom: 3,
            whiteSpace: "nowrap",
            paddingLeft: 4,
          }}
        >
          Search History
        </Typography>
        <Box
          width="90%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          height="100%"
        >
          <Sort
            item1="A-Z"
            item2="Z-A"
            item3="Newest"
            item4="Oldest"
            setSort={setSortStr}
          />
          <SearchBar setSearch={setSearchStr} />
        </Box>
      </Box>
      <Box display="flex" width="100%" flexWrap="wrap" pt={10} height="100vh">
        {filteredHistory
          .slice(0)
          .reverse()
          .map((h) => (
            <HistoryCard
              key={h.search_id}
              historyItem={h}
              uploadImage={uploadImage.uploadImage}
            />
          ))}
      </Box>
    </Box>
  );
};

export default HistoryPage;

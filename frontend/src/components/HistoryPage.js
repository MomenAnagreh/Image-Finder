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
        flexWrap: "wrap",
        width: 500,
        height: 500,
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
        <CardContent>
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
      setHistoryData(res.data);
    };
    fetch();
  }, []);

  return loading || uploadImage.loading ? (
    <CircularProgress size={75} />
  ) : (
    <Box color="black" width="100%" marginTop={7}>
      <Typography
        variant="h4"
        sx={{
          fontSize: 32,
          fontFamily: "inherit",
          fontWeight: 700,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        Search History
      </Typography>
      <Box display="flex" width="100%" height="1000px">
        {historyData
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

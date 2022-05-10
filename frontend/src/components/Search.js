import React from "react";
import { useNavigate } from "react-router-dom";
import { useUploadImage } from "../api";
import { CircularProgress, Tabs, Tab, Box } from "@mui/material";
import { onFileResize } from "../ImageResize";
import Cam from "./Cam";
import { ImageUpload } from "./ImageUpload";

function Search() {
  const [tabVal, setTabVal] = React.useState("upload");
  const [uploadImageState, uploadImage] = useUploadImage();
  const navigate = useNavigate();

  const handleFileUpload = (data) => {
    onFileResize({ file: data, navigate, uploadImage });
  };

  const handleTabChange = (e, newVal) => {
    setTabVal(newVal);
  };
  return uploadImageState.loading ? (
    <CircularProgress size={75} />
  ) : (
    <Box
      sx={{
        margin: "65px 80px 80px 80px",
        padding: 2,
        border: "1px solid lightGrey",
        borderRadius: 2,
        width: "80%",
      }}
    >
      <Tabs
        value={tabVal}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ padding: 1 }}
      >
        <Tab label="Upload" value="upload" />
        <Tab label="Camera" value="camera" />
      </Tabs>
      {tabVal === "upload" && (
        <ImageUpload handleFileUpload={handleFileUpload} />
      )}
      {tabVal === "camera" && <Cam handleFileUpload={handleFileUpload} />}
    </Box>
  );
}

export default Search;

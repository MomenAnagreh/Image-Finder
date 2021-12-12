import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useUploadImage } from "../api";
import { CircularProgress } from "@mui/material";

function Search() {
  const { loading, uploadImage } = useUploadImage();
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);

      reader.onload = async () => {
        const b64WTag = reader.result;
        const b64 = b64WTag.replace(/^data:image\/[a-z]+;base64,/, "");
        const res = await uploadImage(b64);
        navigate("/results", { state: res.data });
      };
    },
    [navigate, uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return loading ? (
    <CircularProgress size={75} />
  ) : (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ color: "#29b6f6", margin: "auto" }}>
          Drop the files here ...
        </p>
      ) : (
        <p style={{ color: "#29b6f6", margin: "auto" }}>
          Drop files here, or click to select files
        </p>
      )}
    </div>
  );
}

const baseStyle = {
  flex: 0.25,
  display: "flex",
  flexDirection: "inherit",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "Gainsboro",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: 1200,
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

export default Search;

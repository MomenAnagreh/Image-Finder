import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { onFileResize } from "./ImageResize";
import Cam from "./Cam";

function Search() {
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);

    reader.onload = () => {
      onFileResize(acceptedFiles[0]);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return (
    <div>
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
      <Cam />
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
  minHeight: 300,
};

const activeStyle = {
  borderColor: "#2196f3",
};

export default Search;

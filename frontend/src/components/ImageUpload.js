import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
  cursor: "pointer",
  minHeight: 400,
};

const activeStyle = {
  borderColor: "#2196f3",
};

export const ImageUpload = ({ handleFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onload = async () => {
          handleFileUpload(acceptedFiles[0]);
        };
        console.log(acceptedFiles);
      }
    },
    [handleFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: "image/jpeg,image/png",
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ color: "#29b6f6", margin: "auto" }}>
          Drop the files here ...
        </p>
      ) : (
        <p style={{ color: "#29b6f6", margin: "auto" }}>
          {fileRejections.length
            ? "Invalid File"
            : "Drop files here, or click to select files"}
        </p>
      )}
    </div>
  );
};

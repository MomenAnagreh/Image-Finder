import React, { useEffect } from "react";
import CameraIcon from "@mui/icons-material/CameraAlt";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

const videoConstraints = {
  width: 500,
  height: 400,
  facingMode: "user",
};

export const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function Cam({ handleFileUpload }) {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = dataURLtoBlob(imageSrc);
    handleFileUpload(file);
  }, [handleFileUpload]);

  useEffect(() => {
    navigator?.getUserMedia?.(
      { audio: true, video: true },
      function (stream) {
        stream.getTracks().forEach((x) => x.stop());
      },
      (err) => console.log(err)
    );
  }, []);

  return (
    <div style={{ paddingTop: 20 }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button onClick={capture} variant="outlined" startIcon={<CameraIcon />}>
          Capture photo
        </Button>
      </div>
      <Webcam
        audio={false}
        height={"25%"}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={"35%"}
        videoConstraints={videoConstraints}
      />
    </div>
  );
}

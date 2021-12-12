import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { uploadImage } from "../api";
import { onFileResize } from "./ImageResize";

export default function Cam() {
  const [hideCamera, setHideCamera] = useState(true);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const x = dataURLtoBlob(imageSrc);
    const y = onFileResize(x);
    console.log(`y`, y);
  }, []);

  useEffect(() => {
    navigator?.getUserMedia?.(
      { audio: true, video: true },
      function (stream) {
        stream.getTracks().forEach((x) => x.stop());
      },
      (err) => console.log(err)
    );
  }, []);

  const handleToggleCamera = () => {
    setHideCamera((prev) => !prev);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {!hideCamera ? (
          <Button
            onClick={capture}
            sx={{
              backgroundColor: "#29b6f6",
              color: "white",
              marginRight: 4,
            }}
            variant="contained"
          >
            Capture photo
          </Button>
        ) : null}
        <Button
          onClick={handleToggleCamera}
          sx={{
            backgroundColor: "#29b6f6",
            color: "white",
          }}
          variant="contained"
        >
          take picture
        </Button>
      </div>
      <div>
        <div
          style={{
            opacity: hideCamera ? 0 : 1,
            flex: 0.01,
            marginBottom: 10,
          }}
        >
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
          />
        </div>
      </div>
    </div>
  );
}

const videoConstraints = {
  width: 500,
  height: 400,
  facingMode: "user",
};

const dataURLtoBlob = (dataurl) => {
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

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const x = dataURLtoBlob(imageSrc);
    const y = onFileResize(x);
    console.log(`y`, y);
  }, []);

  return <></>;
};

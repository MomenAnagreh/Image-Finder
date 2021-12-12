import Compress from "react-image-file-resizer";
import { uploadImage } from "../api";

export const onFileResize = (file) => {
  Compress.imageFileResizer(
    file, // the file from input
    480, // width
    480, // height
    "JPEG", // compress format WEBP, JPEG, PNG
    50, // quality
    0, // rotation
    (uri) => {
      console.log(uri);
      const b64 = uri.replace(/^data:image\/[a-z]+;base64,/, "");
      // uploadImage(b64);
    },
    "base64" // blob or base64 default base64
  );
};

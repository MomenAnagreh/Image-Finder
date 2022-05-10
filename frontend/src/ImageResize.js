import Compress from "react-image-file-resizer";

export const onFileResize = ({ file, navigate, uploadImage }) => {
  Compress.imageFileResizer(
    file, // the file from input
    480, // width
    480, // height
    "JPEG", // compress format WEBP, JPEG, PNG
    85, // quality
    0, // rotation
    async (uri) => {
      const b64 = uri.replace(/^data:image\/[a-z]+;base64,/, "");
      const res = await uploadImage(b64);
      console.log(res)
      navigate("/results", {
        state: { resData: res.data, uploadedImage: uri },
      });
    },
    "base64" // blob or base64 default base64
  );
};

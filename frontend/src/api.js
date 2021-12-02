import axios from "axios";
const baseUri = "http://127.0.0.1:9000";

export const uploadImage = async (b64Image) =>
  await axios.post(`${baseUri}/identify`, { image: b64Image });

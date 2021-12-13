import axios from "axios";
import { useState } from "react";
const baseUri = "http://127.0.0.1:9000";

const uploadImageApi = async (b64Image) =>
  await axios.post(`${baseUri}/identify`, { image: b64Image });

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (b64Image) => {
    try {
      setLoading(true);
      const res = await uploadImageApi(b64Image);
      setLoading(false);
      return res;
    } catch {
      setLoading(false);
    }
  };
  return { loading, uploadImage };
};

const getHistoryApi = async () => await axios.get(`${baseUri}/history`);

export const useGetHistory = () => {
  const [loading, setLoading] = useState(false);

  const getHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistoryApi();
      setLoading(false);
      return res;
    } catch {
      setLoading(false);
    }
  };
  return { loading, getHistory };
};



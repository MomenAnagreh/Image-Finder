import axios from "axios";
import { useAsyncFn } from "react-use";
import { Auth } from "aws-amplify";

const baseUri = "http://127.0.0.1:9000";

const uploadImageApi = async (b64Image) => {
  const user = await Auth.currentAuthenticatedUser();
  return await axios.post(`${baseUri}/identify`, {
    image: b64Image,
    user: user.attributes.email,
  });
};
export const useUploadImage = () => useAsyncFn(uploadImageApi, []);

const getHistoryApi = async () => await axios.get(`${baseUri}/history`);
export const useGetHistory = () => useAsyncFn(getHistoryApi, []);

export const createUserApi = async (email) =>
  await axios.post(`${baseUri}/signup`, { email });

const getUsersApi = async () => await axios.get(`${baseUri}/users`);
export const useGetUsers = () => useAsyncFn(getUsersApi, []);

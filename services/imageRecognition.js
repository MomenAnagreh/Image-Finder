import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
import config from "./config.js";

const {
  aws: { accessKeyId, secretAccessKey, region },
} = config;

const client = new RekognitionClient({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export const getLabelsForImage = async b64Image => {
  let imageBytes = Buffer.from(b64Image, "base64");
  const command = new DetectLabelsCommand({ Image: { Bytes: imageBytes } });
  const response = await client.send(command);

  return response;
};

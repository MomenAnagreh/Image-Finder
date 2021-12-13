import {
  RekognitionClient,
  DetectLabelsCommand,
  DetectTextCommand,
} from "@aws-sdk/client-rekognition";
import config from "./config.js";
import vision from "@google-cloud/vision";

const {
  aws: { accessKeyId, secretAccessKey, region },
} = config;

const awsClient = new RekognitionClient({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export const getLabelsForImage = async (b64Image) => {
  const imageBytes = Buffer.from(b64Image, "base64");
  const imageInput = { Image: { Bytes: imageBytes } };

  const labelCommand = new DetectLabelsCommand(imageInput);
  const textCommand = new DetectTextCommand(imageInput);

  const labelResponse = await awsClient.send(labelCommand);
  const textResponse = await awsClient.send(textCommand);

  return { labels: labelResponse.Labels, text: textResponse.TextDetections };
};

const { private_key, client_email } = config.google;
const googleClient = new vision.ImageAnnotatorClient({
  credentials: {
    private_key: private_key,
    client_email: client_email,
  },
});

export const getGoogleImageData = async (b64Image) => {
  const labelRes = await googleClient.annotateImage({
    image: { content: b64Image },
    features: [{ type: "WEB_DETECTION" }],
  });
  return labelRes;
};

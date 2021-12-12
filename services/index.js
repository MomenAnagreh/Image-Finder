import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getGoogleImageData, getLabelsForImage } from "./imageRecognition.js";
import { searchGoogle } from "./googleSearch.js";

const port = process.env.PORT || 9000;
const localHost = `http://127.0.0.1:${port}`;

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// endpoints
app.post("/identify", async (req, res) => {
  const googleVisionRes = await getGoogleImageData(req.body.image);
  const imageLabel = googleVisionRes[0].webDetection.bestGuessLabels[0].label;

  const searchResult = (searchResult) => {
    res.send(searchResult);
  };

  searchGoogle(imageLabel, searchResult);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

import express from "express";
import { getLabelsForImage } from "./imageRecognition.js";

const port = process.env.PORT || 9000;

const app = express();

app.post("/identify", (req, res) => {
  const labels = getLabelsForImage(req.body);
  res.send(labels);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

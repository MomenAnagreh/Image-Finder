import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getLabelsForImage } from "./imageRecognition.js";

const port = process.env.PORT || 9000;
const localHost = `http://127.0.0.1:${port}`;

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// endpoints
app.post("/identify", async (req, res) => {
  const labelsRes = await getLabelsForImage(req.body.image);
  res.send(labelsRes.Labels);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

import GSR from "google-search-results-nodejs";
import config from "./config.js";

const client = new GSR.GoogleSearch(config.serpapi.apiKey);

export const searchGoogle = (text, cb) => {
  client.json(
    {
      q: text,
      tbm: "shop",
    },
    cb
  );
};

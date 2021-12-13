import pg from "pg";
import config from "../config.js";

export const dbClient = new pg.Client({
  ...config.db,
  ssl: {
    rejectUnauthorized: false,
  },
});
dbClient.connect();

export const insertHistory = async (historyData) => {
  const { item_image, item_name } = historyData;
  const query = `
    INSERT INTO public.search_history
        (
            item_image,
            item_name
        )
    VALUES
        (
            $1,
            $2
        );
        `;

  try {
    await dbClient.query(query, [item_image, item_name]);
  } catch (err) {
    console.log(err.stack);
  }
};

export const getHistory = async () => {
  const query = `
    SELECT JSON_AGG(search_history) 
    FROM search_history
  `;

  try {
    const res = await dbClient.query(query);
    return res.rows[0].json_agg;
  } catch (err) {
    console.log(err.stack);
  }
};

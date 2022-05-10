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
  const { item_image, item_name, email } = historyData;
  const query = `
    INSERT INTO public.search_history
        (
            item_image,
            item_name,
            user_id
        )
    VALUES
        (
            $1,
            $2,
            (SELECT user_id FROM users WHERE user_name = $3)
        );
        `;

  try {
    await dbClient.query(query, [item_image, item_name, email]);
  } catch (err) {
    console.log(err.stack);
  }
};

export const getHistory = async () => {
  const query = `
    WITH history_v_user AS (SELECT *
      FROM search_history s
      LEFT JOIN users u
      ON s.user_id = u.user_id)
    SELECT JSON_AGG(hvs) FROM history_v_user hvs;
  `;

  try {
    const res = await dbClient.query(query);
    return res.rows[0].json_agg;
  } catch (err) {
    console.log(err.stack);
  }
};

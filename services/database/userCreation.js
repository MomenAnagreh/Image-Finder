import pg from "pg";
import config from "../config.js";

export const dbClient = new pg.Client({
  ...config.db,
  ssl: {
    rejectUnauthorized: false,
  },
});
dbClient.connect();

export const insertUser = async (userData) => {
  const { email } = userData;
  const query = `
    INSERT INTO public.users
        (
            user_name,
            is_admin
        )
    VALUES
        (
            $1,
            FALSE
        );
        `;

  try {
    await dbClient.query(query, [email]);
  } catch (err) {
    console.log(err.stack);
  }
};

export const getUsers = async () => {
  const query = `
  WITH user_search_count AS (SELECT u.*, COUNT(*)
                              FROM users u
                              LEFT JOIN search_history s
                                  ON s.user_id = u.user_id
                              GROUP BY u.user_id)
  SELECT JSON_AGG(user_search_count) 
    FROM user_search_count
  `;

  try {
    const res = await dbClient.query(query);
    return res.rows[0].json_agg;
  } catch (err) {
    console.log(err.stack);
  }
};

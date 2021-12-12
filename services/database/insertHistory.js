import client from "./client.js";

export const insertHistory = async (historyData) => {
  client.connect();

  const { item_image, item_name, url_link } = historyData;
  const query = `
    INSERT INTO public.search_history
        (
            item_image,
            item_name,
            url_link
        )
    VALUES
        (
            $1,
            $2,
            $3
        );
        `;

  try {
    const res = await client.query(query, [item_image, item_name, url_link]);
    console.log(res);

  } catch (err) {
    console.log(err.stack);
    
  } finally {
    client.end();
  }
};

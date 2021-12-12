CREATE TABLE search_history
    (
        search_id SERIAL PRIMARY KEY,
        item_image BYTEA,
        item_name VARCHAR,
        url_link VARCHAR
    );
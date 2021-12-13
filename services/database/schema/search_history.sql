CREATE TABLE search_history
    (
        search_id SERIAL PRIMARY KEY,
        item_image TEXT,
        item_name VARCHAR,
        search_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
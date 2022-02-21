CREATE TABLE search_history
    (
        search_id SERIAL PRIMARY KEY,
        item_image TEXT,
        item_name VARCHAR,
        search_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE search_history ADD user_id INTEGER NOT NULL DEFAULT 0;

ALTER TABLE search_history
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES users (user_id);
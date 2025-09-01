-- 1️⃣ Create extensions for UUID and case-insensitive text
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS citext;

-- 2️⃣ Create the Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- unique identifier for each user
    email CITEXT NOT NULL UNIQUE,                     -- email, case-insensitive and unique
    password_hash TEXT NOT NULL,                     -- hashed password
    full_name TEXT NOT NULL,                                  -- full name of the user
    role TEXT NOT NULL DEFAULT 'user',               -- role, e.g., user or admin
    address TEXT,                                    -- user address
    phone_number TEXT,                               -- optional phone number
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),     -- creation timestamp
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()      -- last update timestamp
);

-- Optional: Insert a sample user for testing
INSERT INTO users (email, password_hash, full_name, address, phone_number)
VALUES ('testuser@example.com', 'hashed_password_here', 'Test User', '123 Riverside St', '07123456789');


-- 3️⃣ Recipes table (user-created)
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,            -- unique identifier
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,     -- reference to the creator
    title TEXT NOT NULL,                                     -- recipe title
    description TEXT,                                       -- recipe description
    servings INT NOT NULL DEFAULT 1,                        -- number of servings
    prep_minutes INT,                                       -- preparation time in minutes
    cook_minutes INT,                                       -- cooking time in minutes
    created_at TIMESTAMPTZ DEFAULT now(),                   -- creation timestamp
    updated_at TIMESTAMPTZ DEFAULT now()                    -- last update timestamp
);

-- Optional: sample recipe for testing
INSERT INTO recipes (user_id, title, description, servings, prep_minutes, cook_minutes)
VALUES ('replace-with-user-uuid', 'Test Recipe', 'Delicious test recipe', 2, 15, 30);

-- 4️⃣ Ingredients table (normalized, with units)
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,                                   -- unique identifier
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,  -- reference to the recipe
    name TEXT NOT NULL,                                      -- ingredient name
    amount NUMERIC NOT NULL,                                 -- ingredient amount
    unit TEXT CHECK (unit IN ('g', 'ml', 'cup', 'tsp', 'tbsp', 'pcs')),  -- unit type
    created_at TIMESTAMPTZ DEFAULT now(),                    -- creation timestamp
    updated_at TIMESTAMPTZ DEFAULT now()                     -- last update timestamp
);

-- Optional: sample ingredients for testing
INSERT INTO ingredients (recipe_id, name, amount, unit)
VALUES
('replace-with-recipe-id', 'Sugar', 100, 'g'),
('replace-with-recipe-id', 'Milk', 200, 'ml'),
('replace-with-recipe-id', 'Flour', 1, 'cup');

-- Wishlist table stores recipes that users want to save for later
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),           -- unique identifier for each wishlist entry
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,    -- references the user who added the recipe
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE, -- references the saved recipe
    created_at TIMESTAMPTZ DEFAULT now(),                   -- timestamp when the recipe was added to wishlist
    UNIQUE(user_id, recipe_id)                              -- ensures the same user cannot save the same recipe twice
);


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO categories (name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Snack'),
('Dessert'),
('Vegetarian'),
('Vegan'),
('Seafood'),
('Poultry'),
('Beef'),
('Pork'),
('Pasta'),
('Salad'),
('Soup'),
('Appetizer'),
('Street Food'),
('Curry'),
('Pizza'),
('Rice Dish'),
('Baked Goods');

CREATE TABLE recipe_categories (
    recipe_id INT REFERENCES recipes(id),
    category_id INT REFERENCES categories(id),
    PRIMARY KEY(recipe_id, category_id)
);


-- 3️⃣ Select all recipe titles that belong to category ID 6 (e.g., Vegetarian)
SELECT r.title                                     -- select the 'title' column from recipes
FROM recipes r                                     -- 'r' is an alias for the recipes table
JOIN recipe_categories rc ON r.id = rc.recipe_id  -- join with recipe_categories table on recipe_id
JOIN categories c ON rc.category_id = c.id        -- join with categories table on category_id
WHERE c.id = 6;                                   -- filter only recipes that belong to category with ID 6

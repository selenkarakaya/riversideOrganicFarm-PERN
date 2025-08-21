-- 1️⃣ Create extensions for UUID and case-insensitive text
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS citext;

-- 2️⃣ Create the Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- unique identifier for each user
    email CITEXT NOT NULL UNIQUE,                     -- email, case-insensitive and unique
    password_hash TEXT NOT NULL,                     -- hashed password
    full_name TEXT,                                  -- full name of the user
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),            -- unique identifier
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),           -- unique identifier
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE, -- reference to the recipe
    name TEXT NOT NULL,                                     -- ingredient name
    amount NUMERIC NOT NULL,                                -- ingredient amount
    unit TEXT CHECK (unit IN ('g', 'ml', 'cup', 'tsp', 'tbsp', 'pcs')),  -- unit type
    created_at TIMESTAMPTZ DEFAULT now(),                   -- creation timestamp
    updated_at TIMESTAMPTZ DEFAULT now()                    -- last update timestamp
);

-- Optional: sample ingredients for testing
INSERT INTO ingredients (recipe_id, name, amount, unit)
VALUES
('replace-with-recipe-uuid', 'Sugar', 100, 'g'),
('replace-with-recipe-uuid', 'Milk', 200, 'ml'),
('replace-with-recipe-uuid', 'Flour', 1, 'cup');

-- Wishlist table stores recipes that users want to save for later
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),           -- unique identifier for each wishlist entry
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,    -- references the user who added the recipe
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE, -- references the saved recipe
    created_at TIMESTAMPTZ DEFAULT now(),                   -- timestamp when the recipe was added to wishlist
    UNIQUE(user_id, recipe_id)                              -- ensures the same user cannot save the same recipe twice
);

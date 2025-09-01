const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
  "http://localhost:5173", // frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // cookie / auth
  })
);
// Main route
app.get("/", (req, res) => {
  res.send("Riverside Farm Backend is running!");
});

const sequelize = require("./db");

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

testDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

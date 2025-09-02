const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Middleware
const allowedOrigins = ["http://localhost:5173"]; // frontend
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // cookie / auth
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ✅ Routes
app.get("/", (req, res) => {
  res.send("Riverside Farm Backend is running!");
});

app.use("/api/users", userRoutes);

// ✅ Error middleware (after all routes) ✅
app.use(errorHandler);

// ✅ Test the DB connection
async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}
testDB();

// ✅ Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

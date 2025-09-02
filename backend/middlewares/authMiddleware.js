const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token; // ? ile undefined kontrolü

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT decoded:", decoded); // <--- buraya bak
    req.user = decoded; // id ve email gibi bilgileri decoded'dan al

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

module.exports = { protect };

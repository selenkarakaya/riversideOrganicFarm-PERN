const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name } = req.body;

  //validation
  if (!email || !password || !full_name) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if the email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password_hash: hashedPassword,
    full_name,
  });

  res.status(201).json({
    message: "User registered",
    user: { id: newUser.id, email, full_name },
  });
});

module.exports = { registerUser };

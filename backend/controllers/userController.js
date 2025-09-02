const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, phone, address } = req.body;

  // 1️⃣ Validation
  if (!full_name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // 2️⃣ Email already exists?
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // 3️⃣ Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    password_hash: hashedPassword,
    full_name,
    phone,
    address,
  });

  res.status(201).json({
    message: "User registered",
    user: { id: newUser.id, email, full_name, phone, address },
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // 2️⃣ Find existing user
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email");
  }

  // 3️⃣ password compare
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    res.status(401);
    throw new Error("Invalid  password");
  }

  // 4 create token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // 5. Response
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      address: user.address,
    },
    token,
  });
});

module.exports = { registerUser, loginUser };

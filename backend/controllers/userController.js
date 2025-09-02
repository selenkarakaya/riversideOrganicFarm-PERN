const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, phone, address } = req.body;

  // 1️⃣ Input validation: check required fields
  if (!full_name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // 2️⃣ Check if email is already registered
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // 3️⃣ Hash the password before saving to DB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4️⃣ Create new user in the database
  const newUser = await User.create({
    email,
    password_hash: hashedPassword, // store hashed password
    full_name,
    phone,
    address,
  });

  // 5️⃣ Send response with user info (excluding password)
  res.status(201).json({
    message: "User registered",
    user: { id: newUser.id, email, full_name, phone, address },
  });
});

// @desc    Login user and generate JWT token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Input validation: check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // 2️⃣ Find existing user by email
  const user = await User.findOne({ where: { email } });
  // If user not found, return unauthorized
  if (!user) {
    res.status(401);
    throw new Error("Invalid email");
  }

  // 3️⃣ Compare provided password with stored hashed password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  // If password does not match, return unauthorized
  if (!isValidPassword) {
    res.status(401);
    throw new Error("Invalid  password");
  }
  // 4️⃣ Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN } // token expiry
  );

  // 5️⃣ Set token in HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true, // cannot be accessed by JS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site cookie
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  // 6️⃣ Send response with user info (without password)

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    },
  });
});

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // 1️⃣ req.user comes from JWT middleware after authentication
  // It contains user's id, email, etc.

  // 2️⃣ Find user by primary key (id) and select only needed fields
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "full_name", "email", "role"], // select specific fields
  });

  // 3️⃣ If user not found, return 404
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 4️⃣ Send user profile data
  res.json(user);
});

// @desc    Update logged-in user's profile (name, email, phone, address)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, full_name, phone, address } = req.body;

  // 1️⃣ Find user by id from JWT (req.user)
  const user = await User.findByPk(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 2️⃣ Update fields if provided, else keep existing values
  user.email = email || user.email;
  user.full_name = full_name || user.full_name;
  user.phone = phone || user.phone;
  user.address = address || user.address;

  // 3️⃣ Save updated user to database
  await user.save();

  // 4️⃣ Send updated user info in response
  res.json({
    message: "Profile updated successfully",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  });
});

// @desc    Update logged-in user's password
// @route   PUT /api/users/password
// @access  Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // 1️⃣ Validate input: both current and new password must be provided
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Please provide current and new password");
  }

  // 2️⃣ Fetch user from database using JWT id
  const user = await User.findByPk(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 3️⃣ Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) {
    res.status(401);
    throw new Error("Current password is incorrect");
  }

  // 4️⃣ Hash new password and save to database
  const salt = await bcrypt.genSalt(10);
  user.password_hash = await bcrypt.hash(newPassword, salt); // note: use correct field
  await user.save();

  // 5️⃣ Send success response
  res.json({ message: "Password updated successfully" });
});

// @desc    Logout user by clearing JWT cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  // 1️⃣ Clear the token cookie by setting it to empty and expiring immediately
  res.cookie("token", "", {
    httpOnly: true, // cookie cannot be accessed via JS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in production
    expires: new Date(0), // expire immediately
  });

  // 2️⃣ Send success response
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  logoutUser,
};

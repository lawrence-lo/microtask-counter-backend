const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// validation
const { accountValidation } = require("../validation");

// register route
router.post("/register", async (req, res) => {
  // validate account
  const { error } = accountValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // throw error if username is already registered
  const isUserExist = await User.findOne({ username: req.body.username });
  if (isUserExist)
    return res.status(400).json({ error: "User already exists." });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password, // hashed password
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login route
router.post("/login", async (req, res) => {
  // validate account
  const { error } = accountValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // check username
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ error: "User does not exist." });

  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid password." });

  // create token
  const token = jwt.sign(
    // payload data
    {
      username: user.username,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });
});

module.exports = router;

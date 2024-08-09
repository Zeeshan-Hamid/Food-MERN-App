const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }
    req.userId = data.id;

    next();
  });
};

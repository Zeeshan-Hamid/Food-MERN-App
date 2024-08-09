const User = require("../models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;

    const auth = await User.findOne({ email: email });
    if (auth) {
      return res.json({ message: "User Already exists" });
    }

    const user = await User.create({
      userName: userName,
      email: email,
      password: password,
    });

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("Signup Faled", error);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid email" });
    }
    const passAuth = await bcrypt.compare(password, user.password);
    if (!passAuth) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using https
      //sameSite: "Strict",
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};



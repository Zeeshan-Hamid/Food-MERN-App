const User = require("../models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res, next) => {
  try {
    const body = req.body

    const auth = await User.findOne({ email: body.email });
    if (auth) {
      return res.json({ status: false, message: "User Already exists" });
    }

    const user = await User.create(body);

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
      return res.status(403).json({ status: false, message: "Invalid email" });
    }
    const passAuth = await bcrypt.compare(password, user.password);
    if (!passAuth) {
      return res
        .status(403)
        .json({ status: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using https
      //sameSite: "Strict",
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenId = req.userId;
  const { password, ...inputs } = req.body;

  let updatedData = { ...inputs };
  if (password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedData.password = hashedPassword;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to hash password" });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User update ni hoa" });
  }
};

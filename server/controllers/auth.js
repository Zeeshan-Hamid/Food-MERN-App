const User = require("../models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res, next) => {
  try {
    const { userName, email, password, image } = req.body;

    const auth = await User.findOne({ email });
    if (auth) {
      return res.json({ status: false, message: "User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName, email, image, password: hashedPassword
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
      return res.status(401).json({ status: false, message: "Invalid email" }); 
    }

    const passAuth = await bcrypt.compare(password, user.password);
    if (!passAuth) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid password" }); 
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "3d", 
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "Lax", 
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json(userResponse);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
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

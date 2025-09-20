import express from 'express';
import createUser from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
         secure: process.env.NODE_ENV === "production",
        sameSite: "none", 
        maxAge: 24 * 60 * 60 * 1000, 
        path: "/",
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

const authLogOut = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { authLogin, authLogOut };

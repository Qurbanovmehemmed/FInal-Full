import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import jwt from "jsonwebtoken";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import LoginValidationSchema from "../middleware/validation/LoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidation.js";
import ResetValidationSchema from "../middleware/validation/ResetValidation.js";
import path from "path";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const { filename } = req.file;

    const imageUrl = `images/${filename}`.replace(/\\/g, "/");

    const { error } = RegisterValidationSchema.validate({
      name,
      username,
      email,
      password,
      
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userCount = await user.countDocuments();
    const isAdmin = userCount === 0;

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      image: imageUrl,
      name,
      username,
      email,
      password: hasedPassword,
      isAdmin: isAdmin,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    const confirmLink = `${process.env.SERVER_LINK}/auth/verify`;

    recieveMail(newUser, confirmLink);

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedVerify = await user.findByIdAndUpdate(
      { _id: decoded.id },
      { isVerified: true }
    );

    if (updatedVerify) {
      return res.redirect(`${process.env.CLIENT_LINK}/login`);
    }
  } catch (error) {
    return res.status(400).json({ message: "Token not valid or expaired in" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { error } = LoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ username: username });

    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Username or Password wrong" });
    }

    generateToken(existUser._id, res);

    existUser.isLogin = true;
    await existUser.save();


    return res.status(200).json({
      message: "User logged in successfully",
      existUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    console.log(req.user); // req.user-in düzgün gəldiyini yoxlayın
    const existUser = await user.findById(req.user.id);

    if (!existUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    existUser.isLogin = false;
    await existUser.save();
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = ForgotValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (!existUser) return res.status(404).json({ message: "User not found" });

    generateToken(existUser._id, res, "resetToken");

    const resetLink = `${process.env.CLIENT_LINK}/resetpassword`;

    recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  console.log();
  console.log(req.body);

  try {
    const { password } = req.body;

    const { error } = ResetValidationSchema.validate({
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res
        .status(400)
        .json({ message: "No token found, request new one" });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const existUser = await user.findById(decoded.id);

    if (!existUser) {
      return res.status(400).json({ message: "Token not valid or expaired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    existUser.password = hashedPassword;

    await existUser.save();

    res.clearCookie("resetToken");

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // AuthMiddleware-dən gələn istifadəçi ID
    const { name, username, email } = req.body;
    let updatedData = { name, username, email };

    // Əgər şəkil yüklənibsə, onu əlavə et
    if (req.file) {
      const imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");
      updatedData.image = imageUrl;
    }

    // Yeni məlumatları DB-də yenilə
    const updatedUser = await user.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const updateFavoriteCategories = async (req, res) => {
  try {

    const { favCategories } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(favCategories)) {
      return res.status(400).json({ message: "Categories must be an array" });
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { favCategories }, // 🔹 favCategories-i yenilə
      { new: true } // 🔹 Yenilənmiş user-i qaytar
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      updatedFavorites: updatedUser.favCategories,
    });
  } catch (error) {
    console.error("Xəta:", error);
    return res.status(500).json({ message: error.message });
  }
};


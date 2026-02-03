import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Register request body:", req.body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });

    console.log("New user created:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt for username:", username);

    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    console.log("User found:", user.username);

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log("Invalid password for user:", username);
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    console.log("Password valid for user:", username);

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    // FIXED: Cookie settings for cross-origin requests
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? "none" : "lax", // "none" for cross-origin in production
      maxAge: age,
    })
    .status(200)
    .json(userInfo);

    console.log("Login successful for user:", username);

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
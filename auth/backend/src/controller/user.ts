import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { setToken } from "../utils/generateToken";
import Profile from "../models/profile";

const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await Profile.create({ username, email, createdBy: user._id });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const handleLoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    const token = setToken(user);
    res.cookie("token", token);

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const handleProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    return res.status(200).json({ message: "Valid User", user });
  } catch (error) {
    console.error("Error handling profile:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
export { handleRegisterUser, handleLoginUser, handleProfile };

import User from "../../models/users";
import type { Request, Response } from "express";
import { generateToken, verifyToken } from "../../utils/jwt";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  res.status(200).json({
    message: "Logged in successfully",
    token,
    user: { userId: user._id, name: user.name, email: user.email },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = await generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  res.status(201).json({
    message: "User created successfully",
    token,
    user: { userId: user._id, name: user.name, email: user.email },
  });
};

export const authenticate = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = await verifyToken(token);

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      message: "Authenticated",
      user: { userId: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

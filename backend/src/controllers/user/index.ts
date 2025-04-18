import User from "../../models/users";
import type { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "../../utils/jwt";
import bcrypt from "bcrypt";

export const handleLogin = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("use not found!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("password din't match");
  }

  const token = await generateToken({
    userId: user._id.toString(),
    email: user.email,
  });
  return token;
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await handleLogin(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.render("index", { error: "An error occurred during login" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/");
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.render("signup", { error: "All fields are required" });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });

    const token = await generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to dashboard after successful registration
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Registration error:", error);
    res.render("signup", { error: "An error occurred during registration" });
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.headers.cookie?.split("=")[1] ||
    req.headers.authorization?.split(" ")[1];
  const path = req.path;
  if (token) {
    try {
      const payload = await verifyToken(token);
      const user = await User.findById(payload.userId);

      if (user) {
        res.locals.user = {
          userId: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      } else {
        if (path === "/") {
          return res.render("index");
        } else if (path === "/signup") {
          return res.render("signup");
        } else {
          return res.redirect("/");
        }
      }

      next();
    } catch {
      res.json({ error: "UnAuthorize" }).status(401);
    }
  } else {
    if (path === "/") {
      res.render("index");
    } else if (path === "/signup") {
      res.render("signup");
    } else {
      res.json({ error: "UnAuthorize" }).status(401);
    }
  }
};

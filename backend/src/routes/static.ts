import express from "express";
import { login, register, authenticate } from "../controllers/user";
import { UserDetails } from "../models/userDetails";

const router = express.Router();

// Public routes
router.get("/", authenticate, (req, res) => {
  // If authenticated, redirect to dashboard
  if (res.locals.user) {
    return res.redirect("/dashboard");
  }
  // If not authenticated, render the login page
  res.render("index", { error: undefined });
});

router.get("/signup", authenticate, (req, res) => {
  if (res.locals.user) {
    return res.redirect("/dashboard");
  }
  res.render("signup", { error: undefined });
});

// Handle form submissions
router.post("/login", login);
router.post("/signup", register);

// Protected routes
router.get("/dashboard", authenticate, async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({
      userId: res.locals.user.userId,
    });
    res.render("dashboard", {
      user: res.locals.user,
      userDetails: userDetails || {},
      message: req.query.message,
      error: req.query.error,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.render("dashboard", {
      user: res.locals.user,
      userDetails: {},
      message: undefined,
      error: "Failed to load user details",
    });
  }
});

export default router;

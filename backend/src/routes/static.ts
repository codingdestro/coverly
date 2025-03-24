import express from "express";
import { login, register, authenticate } from "../controllers/user";
import {
  UserDetails,
  Education,
  Experience,
  Social,
} from "../models/userDetails";

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
    const userId = res.locals.user.userId;
    const [userDetails, educationList, experienceList, socialList] =
      await Promise.all([
        UserDetails.findOne({ userId }),
        Education.find({ userId }).sort({ startDate: -1 }),
        Experience.find({ userId }).sort({ startDate: -1 }),
        Social.find({ userId }),
      ]);

    res.render("dashboard", {
      user: res.locals.user,
      userDetails: userDetails || {},
      educationList,
      experienceList,
      socialList,
      message: req.query.message,
      error: req.query.error,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.render("dashboard", {
      user: res.locals.user,
      userDetails: {},
      educationList: [],
      experienceList: [],
      socialList: [],
      message: undefined,
      error: "Failed to load user data",
    });
  }
});

export default router;

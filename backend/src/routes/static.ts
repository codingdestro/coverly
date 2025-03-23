import express from "express";
import { login, register, authenticate } from "../controllers/user";

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
router.get("/dashboard", authenticate, (req, res) => {
  res.render("dashboard", { user: res.locals.user });
});

export default router;

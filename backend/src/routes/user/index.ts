import { login, register, logout, authenticate } from "../../controllers/user";
import express from "express";

const router = express.Router();

router.post("/login", login, (req, res) => res.redirect("/dashboard"));
router.post("/ext/login", login, (req, res) => {
  res.json({ token: req.body.token }).status(200);
});
router.post("/logout", logout);
router.post("/register", register);
router.post("/authenticate", authenticate);

export default router;

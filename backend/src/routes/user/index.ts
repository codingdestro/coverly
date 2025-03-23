import { login, register, logout, authenticate } from "../../controllers/user";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/authenticate", authenticate);

export default router;

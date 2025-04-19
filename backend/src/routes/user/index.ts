import {
  login,
  register,
  logout,
  authenticate,
  handleLogin,
} from "../../controllers/user";
import express from "express";
import { generateToken, verifyToken } from "../../utils/jwt";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/authenticate", authenticate);
router.post(
  "/ext/login",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        res.statusCode = 401;
        res.json({ error: "no credentianls" });
      }
      const token = await handleLogin(email, password);
      res.json({ token }).status(200);
    } catch {
      res.statusCode = 401;
      res.json({ error: "failed to login try again." });
    }
  },
);
router.post("/ext/authenticate", async (req, res) => {
  try {
    const token =
      req.headers.cookie?.split("=")[1] ||
      req.headers.authorization?.split(" ")[1];
    if (token) {
      const payload = await verifyToken(token);
      const refereshToken = await generateToken(payload);
      res.json({ token: refereshToken });
    } else {
      res.statusCode = 401;
      res.json({ err: "authenticate failed" });
    }
  } catch {
    res.statusCode = 401;
    res.json({ err: "authenticate failed" });
  }
});

export default router;

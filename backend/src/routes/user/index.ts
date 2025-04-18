import {
  login,
  register,
  logout,
  authenticate,
  handleLogin,
} from "../../controllers/user";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post(
  "/ext/login",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      if (!email && !password)
        res.json({ error: "no credentianls" }).status(401);
      const token = await handleLogin(email, password);
      res.json({ token: req.body.token }).status(200);
      res.json({ token }).status(200);
    } catch (error) {
      console.log(error);
    }
  },
);
router.post("/logout", logout);
router.post("/register", register);
router.post("/authenticate", authenticate);

export default router;

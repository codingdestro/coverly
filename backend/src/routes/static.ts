import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    message: "Welcome to Coverly for your job assistance!",
  });
});

export default router;

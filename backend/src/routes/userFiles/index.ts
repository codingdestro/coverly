import { Router } from "express";
import { authenticate } from "../../controllers/user";
import UserFiles from "../../models/userFiles";
import { filesPath } from "../../controllers/userFiles";

const router = Router();

router.post("/fetch", authenticate, async (req, res) => {
  const { userId } = res.locals.user;
  if (!userId) {
    res.statusCode = 404;
    res.json({ err: "user id not found!" });
  }

  const userDocs = await UserFiles.find({
    userId,
  });
  console.log(userDocs);
  res.json({ documents: userDocs });
});

router.post("/download", authenticate, async (req, res) => {
  const { userId } = res.locals.user;
  const { fileId } = req.body;
  if (!userId || !fileId) {
    res.statusCode = 404;
    res.json({ err: "user id not found!" });
  }
  return res.download(`${filesPath}/${fileId}.pdf`);
});
export default router;

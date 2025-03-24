import { Router } from "express";
import {
  createCoverLetter,
  createResume,
} from "../../controllers/ai/coverletter";
import { authenticate } from "../../controllers/user";
const router = Router();

router.post("/createresume", createResume);
router.get("/coverletter", authenticate, createCoverLetter);

export default router;

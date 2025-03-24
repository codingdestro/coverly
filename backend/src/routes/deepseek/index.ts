import { Router } from "express";
import {
  createCoverLetter,
  createResume,
} from "../../controllers/ai/coverletter";
import { authenticate } from "../../controllers/user";
const router = Router();

router.post("/createresume", authenticate, createResume);
router.post("/coverletter", authenticate, createCoverLetter);

export default router;

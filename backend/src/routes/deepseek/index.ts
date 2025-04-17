import { Router } from "express";
import {
  createCoverLetter,
  createResumeTemplate,
} from "../../controllers/ai/coverletter";
import { authenticate } from "../../controllers/user";
const router = Router();

router.post("/coverletter", authenticate, createCoverLetter);
router.post("/resume", authenticate, createResumeTemplate);

export default router;

import { Router } from "express";
import {
  createCoverLetter,
  createResume,
} from "../../controllers/ai/coverletter";

const router = Router();

router.post("/createresume", createResume);
router.get("/coverletter", createCoverLetter);

export default router;

import { Router } from "express";
import { createCoverLetter } from "../../controllers/ai/coverletter";

const router = Router();

router.get("/coverletter", createCoverLetter);

export default router;

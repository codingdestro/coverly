import { Router } from "express";
import {
  addUserDetails,
  addSocialMedia,
  addEducation,
  addExperience,
  getUserDetails,
  getEducation,
  getExperience,
  getSocialMedia,
} from "../../controllers/userDetails";
import { userAuth } from "../../middleware/userAuth";

const router = Router();

router.post("/", userAuth, addUserDetails);
router.post("/social", addSocialMedia);
router.post("/education", addEducation);
router.post("/experience", addExperience);
router.get("/userdetails/:userId", getUserDetails);
router.get("/education/:userId", getEducation);
router.get("/experience/:userId", getExperience);
router.get("/social/:userId", getSocialMedia);

export default router;

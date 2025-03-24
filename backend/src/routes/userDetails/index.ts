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
  deleteEducation,
  deleteExperience,
  deleteSocial,
  updateEducation,
  updateExperience,
  updateSocial,
} from "../../controllers/userDetails";
import { userAuth } from "../../middleware/userAuth";

const router = Router();

// User details routes
router.post("/", userAuth, addUserDetails);
router.get("/", userAuth, getUserDetails);

// Education routes
router.post("/education", userAuth, addEducation);
router.get("/education", userAuth, getEducation);
router.put("/education/:id", userAuth, updateEducation);
router.delete("/education/:id", userAuth, deleteEducation);

// Experience routes
router.post("/experience", userAuth, addExperience);
router.get("/experience", userAuth, getExperience);
router.put("/experience/:id", userAuth, updateExperience);
router.delete("/experience/:id", userAuth, deleteExperience);

// Social media routes
router.post("/social", userAuth, addSocialMedia);
router.get("/social", userAuth, getSocialMedia);
router.put("/social/:id", userAuth, updateSocial);
router.delete("/social/:id", userAuth, deleteSocial);

export default router;

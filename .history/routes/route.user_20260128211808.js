import express from 'express';
import { uploadProfilePicture, UserProfile } from '../controllers/controller.user.js';
import upload from '../middleware/middleware.multer.js';

const profileRouter = express.Router();

// Create user
profileRouter.post("/user", UserProfile);

router.post("/:userId/profile-picture", upload.single("profilePicture"), uploadProfilePicture)

router.delete("/:userId/profile-picture",);

router.get("/:userId/profile-picture", userController.getProfilePicture

export default profileRouter;

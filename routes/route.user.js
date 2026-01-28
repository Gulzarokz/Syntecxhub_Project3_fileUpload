import express from 'express';
import { deleteProfilePicture, getProfilePicture, uploadProfilePicture, UserProfile } from '../controllers/controller.user.js';
import upload from '../middleware/middleware.multer.js';

const profileRouter = express.Router();

// Create user
profileRouter.post("/user", UserProfile);

profileRouter.post("/:userId/profile-picture", upload.single("profilePicture"), uploadProfilePicture);

profileRouter.delete("/:userId/profile-picture", deleteProfilePicture);

profileRouter.get("/:userId/profile-picture", getProfilePicture);
export default profileRouter;

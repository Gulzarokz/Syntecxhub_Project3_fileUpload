import express from 'express';
import { uploadProfileImage, UserProfile } from '../controllers/controller.user.js';
import upload from '../middleware/middleware.multer.js';

const profileRouter = express.Router();

// Create user
profileRouter.post("/user", UserProfile);

// Upload single file (profile image)
profileRouter.post("/upload/:id", upload.single("fileUploads"), uploadProfileImage);

export default profileRouter;

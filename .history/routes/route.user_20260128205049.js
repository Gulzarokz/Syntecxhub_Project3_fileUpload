import express from 'express';
import { uploadProfileImage, UserProfile } from '../controllers/controller.user.js';
import upload from '../middleware/middleware.multer.js';

const profileRouter = express.Router();

// Create user
profileRouter.post("/user", UserProfile);

// Upload multiple files (gallery)
profileRouter.post("/upload/:id", upload.array("gallery", 10), uploadProfileImage);

export default profileRouter;

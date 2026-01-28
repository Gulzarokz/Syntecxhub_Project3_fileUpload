import express from 'express';
import { uploadProfileImage, UserProfile } from '../controllers/controller.user.js';
import multer from 'multer';
import upload from '../middleware/middleware.multer.js';
const profileRouter = express.Router();

profileRouter.post("/user", UserProfile)
profileRouter.post("/upload/:id", upload.array("gallery, 10"), uploadProfileImage);

export default profileRouter;
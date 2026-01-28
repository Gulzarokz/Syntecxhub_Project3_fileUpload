import express from 'express';
import { uploadProfileImage } from '../controllers/controller.user.js';
import multer from 'multer';
import uploads from '../middleware/middleware.multer.js';
const profileRouter = express.Router();

profileRouter.post('/upload', upload.single("uploadProfileImage"), uploadProfileImage);

export default profileRouter;
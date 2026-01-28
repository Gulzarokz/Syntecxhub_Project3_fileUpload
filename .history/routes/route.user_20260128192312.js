import express from 'express';
import { uploadProfileImage } from '../controllers/controller.user.js';
import upload from '../middlewares/middleware.upload.js';

const profileRouter = express.Router();

profileRouter.post('/upload', upload.single("uploadProfileImage"), uploadProfileImage);

export default profileRouter;
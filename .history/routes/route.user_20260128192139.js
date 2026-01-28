import express from 'express';
import { uploadProfileImage } from '../controllers/controller.user.js';

const profileRouter = express.Router();

profileRouter.post('/upload', uploadProfileImage);

export default profileRouter;
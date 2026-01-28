import express from 'express';
import { uploadProfileImage } from '../controllers/controller.user.js';

const router = express.Router();

router.post('/upload', uploadProfileImage);

export default router;
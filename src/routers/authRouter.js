import express from 'express';
import { signUp } from '../controllers/authController.js';
import { validateSignUp } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignUp, signUp);

export default router;
import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSignUp, validateSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

export default router;
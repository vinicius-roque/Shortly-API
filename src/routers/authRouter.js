import express from 'express';
import { validateSingUp, validateSingIn } from '../middlewares/authMiddleware.js';
import { signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', validateSingUp, signUp);
router.post('/signin', validateSingIn, signIn);

export default router;
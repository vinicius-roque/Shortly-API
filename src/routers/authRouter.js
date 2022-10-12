import express from 'express';
import { validateSingUp } from '../middlewares/authMiddleware.js';
import { signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', validateSingUp, signUp);
router.post('/signin', signIn);

export default router;
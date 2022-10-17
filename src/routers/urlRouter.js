import express from 'express';
import { shortenUrl } from '../controllers/urlController.js';
import { validateUrl } from '../middlewares/urlMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', validateUrl, shortenUrl);

export default router;
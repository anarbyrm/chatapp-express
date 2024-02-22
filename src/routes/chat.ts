import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { sendMessage, getChat } from '../controllers/chat';
import { verifyToken } from '../middleware/auth';
import { chatSchema } from '../schemas/chat';

const router = Router();

router.get('/messages/:userId', verifyToken, getChat);
router.post('/messages/:userId', verifyToken, checkSchema(chatSchema), sendMessage);

export default router;
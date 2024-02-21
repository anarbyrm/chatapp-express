import { Router } from 'express';

import { sendMessage } from '../controllers/chat';

const router = Router();

router.post('/messages', sendMessage);

export default router;
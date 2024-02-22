import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from './user';
import chatRoutes from './chat';

const router = Router();

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/chat', chatRoutes)

export default router;

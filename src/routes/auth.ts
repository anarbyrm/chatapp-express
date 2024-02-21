import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { createUser } from '../controllers/auth';
import { UserSchema } from '../schemas/user';

const router = Router();

router.post('/create', checkSchema(UserSchema), createUser);
// router.post('/token', );

export default router;
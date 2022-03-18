import { Router } from 'express';
import post from './post';
import auth from './auth';

const router = Router();

router.use('/posts', post);
router.use('/auth', auth);

export default router;

import Router from 'express';
import * as ctrl from './ctrl';

const router = Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/check', ctrl.check);
router.get('/logout', ctrl.logout);

export default router;

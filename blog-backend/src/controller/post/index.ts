import { Router } from 'express';
import * as ctrl from './ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const router = Router();

router.get('/', ctrl.list);
router.post('/', checkLoggedIn, ctrl.write);

router.get('/:id', ctrl.getPostById, ctrl.read);
router.delete('/:id', checkLoggedIn, ctrl.getPostById, ctrl.remove);
router.patch('/:id', checkLoggedIn, ctrl.getPostById, ctrl.update);

export default router;

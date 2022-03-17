import { Router } from 'express';
import * as ctrl from './ctrl';

const post = Router();

post.get('/', ctrl.list);
post.post('/', ctrl.write);

post.get('/:id', ctrl.checkObjectId, ctrl.read);
post.delete('/:id', ctrl.checkObjectId, ctrl.remove);
post.patch('/:id', ctrl.checkObjectId, ctrl.update);

export default post;

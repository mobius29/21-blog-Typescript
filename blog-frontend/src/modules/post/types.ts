import { ActionType } from 'typesafe-actions';
import { IPost } from '../../type/post';
import * as actions from './actions';

export type State = {
  post: IPost | null;
  error: any;
};

export type Action = ActionType<typeof actions>;

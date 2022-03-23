import { ActionType } from 'typesafe-actions';
import { IPost } from '../../type/post';
import * as actions from './actions';

export type State = {
  posts: IPost[] | null;
  error: any;
  lastPage: number;
};

export type Action = ActionType<typeof actions>;

import { ActionType } from 'typesafe-actions';
import { IPost } from '../../type/post';
import * as actions from './actions';

export type State = {
  title: string;
  body: string;
  tags: string[];
  post: IPost | null;
  postError: any;
  originalPostId: string | null;
};

export type Action = ActionType<typeof actions>;

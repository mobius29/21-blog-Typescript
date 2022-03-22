import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = {
  title: string;
  body: string;
  tags: string[];
  post: {
    _id: string;
    user: {
      _id: string;
      username: string;
    };
  } | null;
  postError: any;
};

export type Action = ActionType<typeof actions>;

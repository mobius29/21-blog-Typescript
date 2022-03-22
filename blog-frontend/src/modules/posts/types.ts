import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = {
  posts:
    | {
        _id: string;
        title: string;
        body: string;
        tags: string[];
        publishedDate: Date;
        user: {
          _id: string;
          username: string;
        };
      }[]
    | null;
  error: any;
  lastPage: number;
};

export type Action = ActionType<typeof actions>;

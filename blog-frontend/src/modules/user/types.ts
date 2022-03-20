import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = {
  user: {
    _id: string;
    username: string;
    __v: number;
  } | null;
  checkError: any;
};

export type Action = ActionType<typeof actions>;

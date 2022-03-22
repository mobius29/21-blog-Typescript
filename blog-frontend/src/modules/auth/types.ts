import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
  auth: {
    _id: string;
    username: string;
  } | null;
  authError: any;
};

export type Action = ActionType<typeof actions>;

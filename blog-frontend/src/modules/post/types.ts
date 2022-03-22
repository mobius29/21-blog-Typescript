import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = {
  post: any;
  error: any;
};

export type Action = ActionType<typeof actions>;

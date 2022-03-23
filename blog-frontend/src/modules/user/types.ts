import { ActionType } from 'typesafe-actions';
import { IUser } from '../../type/user';
import * as actions from './actions';

export type State = {
  user: IUser | null;
  checkError: any;
};

export type Action = ActionType<typeof actions>;

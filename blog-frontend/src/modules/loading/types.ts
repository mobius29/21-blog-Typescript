import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type State = any;
export type Action = ActionType<typeof actions>;

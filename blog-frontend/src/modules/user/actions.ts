import { createAction } from 'typesafe-actions';
import { IUser } from '../../type/user';

export const TEMP_SET_USER = 'user/TEMP_SET_USER';

export const CHECK = 'user/CHECK' as const;
export const CHECK_SUCCESS = 'user/CHECK_SUCCESS' as const;
export const CHECK_FAILURE = 'user/CHECK_FAILURE' as const;

export const LOGOUT = 'user/LOGOUT' as const;

export const tempSetUser = createAction(TEMP_SET_USER)<IUser>();

export const check = createAction(CHECK)();
export const checkSuccess = createAction(CHECK_SUCCESS)<IUser>();
export const checkFailure = createAction(CHECK_FAILURE)<any>();

export const logout = createAction(LOGOUT)();

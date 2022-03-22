import { createAction } from 'typesafe-actions';

export const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;

export const REGISTER = 'auth/REGISTER' as const;
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS' as const;
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE' as const;

export const LOGIN = 'auth/LOGIN' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

export const changeField = createAction(CHANGE_FIELD)<{
  form: 'register' | 'login';
  key: 'username' | 'password' | 'passwordConfirm';
  value: string;
}>();

export const initializeForm = createAction(INITIALIZE_FORM)<
  'register' | 'login'
>();

export const register = createAction(REGISTER)<{
  username: string;
  password: string;
}>();

export const registerSuccess = createAction(REGISTER_SUCCESS)<{
  _id: string;
  username: string;
}>();

export const registerFailure = createAction(REGISTER_FAILURE)<any>();

export const login = createAction(LOGIN)<{
  username: string;
  password: string;
}>();

export const loginSuccess = createAction(LOGIN_SUCCESS)<{
  _id: string;
  username: string;
}>();

export const loginFailure = createAction(LOGIN_FAILURE)<any>();

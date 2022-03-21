import { createAction } from 'typesafe-actions';

export const INITIALIZE = 'write/INITIALIZE' as const;
export const CHANGE_FIELD = 'write/CHANGE_FIELD' as const;

export const WRITE_POST = 'write/WRITE_POST' as const;
export const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS' as const;
export const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE' as const;

export const initialize = createAction(INITIALIZE)();
export const changeField = createAction(CHANGE_FIELD)<{
  key: string;
  value: string | string[];
}>();
export const writePost = createAction(WRITE_POST)<{
  title: string;
  body: string;
  tags: string[];
}>();
export const writePostSuccess = createAction(WRITE_POST_SUCCESS)<{
  _id: string;
  user: {
    _id: string;
    username: string;
    __v: number;
  };
}>();
export const writePostFailure = createAction(WRITE_POST_FAILURE)<any>();

import { createAction } from 'typesafe-actions';
import { IPost } from '../../type/post';

export const INITIALIZE = 'write/INITIALIZE' as const;
export const CHANGE_FIELD = 'write/CHANGE_FIELD' as const;

export const WRITE_POST = 'write/WRITE_POST' as const;
export const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS' as const;
export const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE' as const;

export const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST' as const;

export const UPDATE_POST = 'write/UPDATE_POST' as const;
export const UPDATE_POST_SUCCESS = 'write/UPDATE_POST_SUCCESS' as const;
export const UPDATE_POST_FAILURE = 'write/UPDATE_POST_FAILURE' as const;

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
export const writePostSuccess = createAction(WRITE_POST_SUCCESS)<IPost>();
export const writePostFailure = createAction(WRITE_POST_FAILURE)<any>();

export const setOriginalPost = createAction(SET_ORIGINAL_POST)<IPost>();

export const updatePost = createAction(UPDATE_POST)<{
  id: string;
  title: string;
  body: string;
  tags: string[];
}>();
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS)<IPost>();
export const updatePostFailure = createAction(UPDATE_POST_FAILURE)<any>();

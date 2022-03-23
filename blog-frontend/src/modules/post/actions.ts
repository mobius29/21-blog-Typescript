import { createAction } from 'typesafe-actions';

export const READ_POST = 'post/READ_POST' as const;
export const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS' as const;
export const READ_POST_FAILURE = 'post/READ_POST_FAILURE' as const;

export const UNLOAD_POST = 'post/UNLOAD_POST' as const;

export const readPost = createAction(READ_POST)<string>();
export const readPostSuccess = createAction(READ_POST_SUCCESS)<{
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  user: {
    _id: string;
    username: string;
  };
}>();
export const readPostFailure = createAction(READ_POST_FAILURE)<any>();
export const unloadPost = createAction(UNLOAD_POST)();

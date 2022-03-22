import { createAction } from 'typesafe-actions';

export const LIST_POSTS = 'posts/LIST_POSTS' as const;
export const LIST_POSTS_SUCCESS = 'posts/LIST_POSTS_SUCCESS' as const;
export const LIST_POSTS_FAILURE = 'posts/LIST_POSTS_FAILURE' as const;

export const listPosts = createAction(LIST_POSTS)<{
  page?: string;
  username?: string;
  tag?: string;
}>();

interface IPayload {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  user: {
    _id: string;
    username: string;
  };
}

interface IMeta {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export const listPostsSuccess = createAction(LIST_POSTS_SUCCESS)<
  IPayload[],
  IMeta
>();

export const listPostsFailure = createAction(LIST_POSTS_FAILURE)<any>();

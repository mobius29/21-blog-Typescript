import { createReducer } from 'typesafe-actions';
import { State, Action } from './types';
import * as actions from './actions';

const initialState: State = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = createReducer<State, Action>(initialState, {
  [actions.LIST_POSTS_SUCCESS]: (
    state,
    { payload: posts, meta: response },
  ) => ({
    ...state,
    posts,
    lastPage: parseInt(response.headers['last-page'], 10),
  }),
  [actions.LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
});

export default posts;

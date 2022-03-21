import { createReducer } from 'typesafe-actions';
import { Action, State } from './types';
import * as actions from './actions';

const initialState: State = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
};

const write = createReducer<State, Action>(initialState, {
  [actions.INITIALIZE]: () => initialState,
  [actions.CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
  [actions.WRITE_POST]: (state) => ({
    ...state,
    post: null,
    postError: null,
  }),
  [actions.WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
    ...state,
    post,
  }),
  [actions.WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
    ...state,
    postError,
  }),
});

export default write;

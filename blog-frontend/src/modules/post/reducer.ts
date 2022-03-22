import { createReducer } from 'typesafe-actions';
import { State, Action } from './types';
import * as actions from './actions';

const initialState = {
  post: null,
  error: null,
};

const reducer = createReducer<State, Action>(initialState, {
  [actions.READ_POST_SUCCESS]: (state, { payload: post }) => ({
    ...state,
    post,
  }),
  [actions.READ_POST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
  [actions.UNLOAD_POST]: () => initialState,
});

export default reducer;

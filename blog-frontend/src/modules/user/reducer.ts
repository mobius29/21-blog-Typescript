import { createReducer } from 'typesafe-actions';
import { Action, State } from './types';
import * as actions from './actions';

const initialState: State = {
  user: null,
  checkError: null,
};

const reducer = createReducer<State, Action>(initialState, {
  [actions.TEMP_SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [actions.CHECK_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    user,
    checkError: null,
  }),
  [actions.CHECK_FAILURE]: (state, { payload: error }) => ({
    ...state,
    user: null,
    checkError: error,
  }),
});

export default reducer;

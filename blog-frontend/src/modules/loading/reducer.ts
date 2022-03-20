import { createReducer } from 'typesafe-actions';
import { Action, State } from './types';
import { START_LOADING, FINISH_LOADING } from './actions';

const initialState = {};

const reducer = createReducer<State, Action>(initialState, {
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload as any]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload as any]: false,
  }),
});

export default reducer;

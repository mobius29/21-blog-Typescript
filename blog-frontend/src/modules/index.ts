import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import loading from './loading';

const rootReducer = combineReducers({ auth, user, write, loading });

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

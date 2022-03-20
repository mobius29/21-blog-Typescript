import createRequestSaga from '../../lib/createRequestSaga';
import { call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import { CHECK, CHECK_FAILURE, LOGOUT } from './actions';

const checkSaga = createRequestSaga(CHECK, authAPI.check);

const checkFailureSaga = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
};

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

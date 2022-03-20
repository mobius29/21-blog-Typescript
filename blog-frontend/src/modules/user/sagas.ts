import createRequestSaga from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import { CHECK } from './actions';

const checkSaga = createRequestSaga(CHECK, authAPI.check);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

import createRequestSaga from '../../lib/createRequestSaga';
import { READ_POST } from './actions';
import * as postAPI from '../../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

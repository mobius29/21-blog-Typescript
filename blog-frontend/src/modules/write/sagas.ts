import createRequestSaga from '../../lib/createRequestSaga';
import { WRITE_POST, UPDATE_POST } from './actions';
import * as postAPI from '../../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

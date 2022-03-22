import createRequestSaga from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { LIST_POSTS } from './actions';
import * as postAPI from '../../lib/api/post';

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

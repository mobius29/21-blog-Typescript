import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

interface Response {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

const createRequestSaga = (type: string, request: any) => {
  const SUCCESS = `${type}_SUCCESS` as const;
  const FAILURE = `${type}_FAILURE` as const;

  return function* (action: any) {
    yield put(startLoading(type));

    try {
      const response: Response = yield call(request, action.payload);

      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }

    yield put(finishLoading(type));
  };
};

export default createRequestSaga;

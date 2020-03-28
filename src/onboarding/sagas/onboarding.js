import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as api from '../api/api';

function headers() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export function* getAccessToken(action) {
  const header = headers();
  const response = yield call(
    api.getAccessToken,
    {
      accountId: action.payload['accountId'],
      pswd: action.payload['pswd'],
    },
    header
  );

  if (typeof response.data['token'] !== 'undefined') {
    sessionStorage.setItem('accountId', action.payload['accountId']);
    sessionStorage.setItem('pswd', action.payload['pswd']);

    yield put({
      type: types.ACCESS_TOKEN_SUCCESS,
      payload: { data: response.data['token'] },
    });
  } else {
    yield put({
      type: types.ACCESS_TOKEN_FAILURE,
      payload: null,
    });
  }
}

export function* getUsers(action) {
  const response = yield api.callAPI(
    api.getUsers,
    action['payload'],
    types.GET_USER_FAILURE
  );

  if (response) {
    yield put({
      type: types.GET_USER_SUCCESS,
      payload: { data: response['data'] },
    });
  }
}

export function* watchOnBoarding() {
  yield takeLatest(types.ACCESS_TOKEN_REQUEST, getAccessToken);
  yield takeLatest(types.GET_USER_REQUEST, getUsers);
}

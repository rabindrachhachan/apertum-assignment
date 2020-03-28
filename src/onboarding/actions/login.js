import * as types from './types';

export function getAccessToken(userName, password) {
  return {
    type: types.ACCESS_TOKEN_REQUEST,
    payload: {
      accountId: userName,
      pswd: password,
    },
  };
}

export function getUsers() {
  return {
    type: types.GET_USER_REQUEST,
    payload: {},
  };
}

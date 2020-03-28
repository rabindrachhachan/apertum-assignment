import { call, put } from 'redux-saga/effects';
import EndPointConfig from '../../utils/endPointConfig';

function headers() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export function* callAPI(api, payload, failureType) {
  try {
    const header = headers();
    const accountId = sessionStorage.getItem('accountId');
    const pswd = sessionStorage.getItem('pswd');
    const tokenResponse = yield call(
      getAccessToken,
      {
        accountId: accountId,
        pswd: pswd,
      },
      header
    );
    if (typeof tokenResponse.data['token'] !== 'undefined') {
      header['Authorization'] = 'bearer ' + tokenResponse.data['token'];
    }

    const response = yield call(api, payload, header);

    if (
      response &&
      response.data.error &&
      response.data.error.status &&
      response.data.error.status === 401
    ) {
      // clear all localstorage
      sessionStorage.clear();
      // redirect to '/login'
      window.location.href = '/login';
    }

    if (!response.status) {
      yield put({ type: failureType, payload: response.data.message });
      return null;
    }
    return response;
  } catch (e) {
    yield put({ type: failureType });
  }
  return null;
}

export async function getAccessToken(data, header) {
  const url = EndPointConfig.Onboarding.token;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: header,
    });

    return {
      status: response.ok,
      data: await response.json(),
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getUsers(data, header) {
  const url = EndPointConfig.Onboarding.getUsers;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: header,
    });
    return {
      status: response.ok,
      data: await response.json(),
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

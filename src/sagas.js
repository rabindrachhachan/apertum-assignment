import { all } from 'redux-saga/effects';
import { watchOnBoarding } from '../src/onboarding/sagas/onboarding';

export default function* rootSaga() {
  yield all([watchOnBoarding()]);
}

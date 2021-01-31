import { all, put, takeLatest, call } from 'redux-saga/effects';

import { login } from '../../api/spotify';

import { REQUEST_LOGIN_ACTION } from '../actions/actionTypes';
import { requestLoginActionSuccess, requestLoginActionFailure } from '../actions';

export function* fetchAuthentication(action) {
  try {
    const user = yield call(login, action.payload.email, action.payload.password);
    yield put(requestLoginActionSuccess(user));
  } catch (err) {
    yield put(requestLoginActionFailure(err.message));
  }
}

function* watchAuthentication() {
  yield takeLatest(REQUEST_LOGIN_ACTION, fetchAuthentication);
}

export default function* watchAuthenticationSagas() {
  yield all([
    watchAuthentication(),
  ]);
}

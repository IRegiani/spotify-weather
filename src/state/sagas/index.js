import { all } from 'redux-saga/effects';

import watchAuthSagas from './auth';

export default function* rootSaga() {
  yield all([
    watchAuthSagas(),
  ]);
}

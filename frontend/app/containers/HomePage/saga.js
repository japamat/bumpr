import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from 'containers/App/constants';

import {
  loginUser,
  loginUserSuccess,
  loginUserError,
} from 'containers/App/actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* loginUserWorker(action) {

}

/**
 * WATCHER SAGAS
 * listen for dispatched actions
 */

export default function* userLoginWatcher() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}

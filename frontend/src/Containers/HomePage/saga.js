import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../App/constants';

import {
  loginUser,
  loginUserSuccess,
  loginUserError,
} from '../App/actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* loginUserWorker(action) {
  console.log('do shit in loginSaga');
  
}


/**
 * DEFAULT SAGA EXPORT
 */

export default function* loginSagas() {
  yield all([
    takeLatest(LOGIN_USER, loginUserWorker),
  ])
}

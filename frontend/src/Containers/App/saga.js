import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GET_USER_INFO } from './constants';
import Request from '../../utils/request';
import history from '../../utils/history';


import {
  getUserInfoSuccess,
  getUserInfoError,
} from '../App/actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* GetUserInfoWorker(action) {
  try {
    const userData = yield call(
      [Request, Request.loadCurrentUser],
      action.username,
    );
    yield put(getUserInfoSuccess(userData));
  } catch (error) {
    yield put(getUserInfoError(error));
  }
}

/**
 * DEFAULT SAGA EXPORT
 */

export const appSagas = [
    takeLatest(GET_USER_INFO, GetUserInfoWorker),
  ]

import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_USER_FEED } from '../HomePage/constants';
import Request from '../../utils/request';
import history from '../../utils/history';


import {
  loadUserSuccess,
  loadUserError,
} from '../HomePage/actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* loadUserWorker(action) {
  try {
    const userData = yield call(
      [Request, Request.getFeed],
      action.username,
      action.feedOffset
    );
    yield put(loadUserSuccess(userData.feed));
  } catch (error) {
    yield put(loadUserError(error));
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const homeSagas = [
    takeLatest(LOAD_USER_FEED, loadUserWorker),
  ]

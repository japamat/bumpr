import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_USER } from './constants';
import Request from '../../utils/request';
import history from '../../utils/history';


import {
  loadUserSuccess,
  loadUserError,
} from './actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* loadUserWorker(action) {
  try {
    console.log(`in userpage saga: `, action);
    
    const userData = yield call(
      [Request, Request.loadUser],
      action.username,
      action.messagesOffset
    );
    yield put(loadUserSuccess(userData));
  } catch (error) {
    yield put(loadUserError(error));
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const userPageSagas = [
    takeLatest(LOAD_USER, loadUserWorker),
  ]

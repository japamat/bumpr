import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_PREVIOUS_USER } from '../App/constants';
import { setToken, getUsernameFromToken } from '../../utils/token';
import Request from '../../utils/request';
import history from '../../utils/history';


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
  try {
    const token = yield call([Request, Request.loginUser], action.payload);
    setToken(token);
    const username = getUsernameFromToken(token);
    yield put(loginUserSuccess(username))
    history.push('/home')
  } catch (error) {
    console.log(error);
    
  }
}

export function* getLoggedInUserWorker(action) {
  try {
    console.log(`hit the loginsaga worker`);
    
    const username = yield call([Request, Request.getLoggedInUser], action.token);
    yield put(loginUserSuccess(username));
  } catch (error) {
    console.log('things broke');
    
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const loginSagas = [
    takeLatest(LOGIN_USER, loginUserWorker),
    takeLatest(LOGIN_PREVIOUS_USER, getLoggedInUserWorker),
  ]

import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './constants';

export const loginUser = payload => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserSuccess = payload => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserError = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

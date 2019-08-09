import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './constants';

export const loginUser = payload => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserSuccess = username => ({
  type: LOGIN_USER_SUCCESS,
  username,
});

export const loginUserError = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

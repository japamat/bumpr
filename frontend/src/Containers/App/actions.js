import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_PREVIOUS_USER } from './constants';

export const loginUser = payload => ({
  type: LOGIN_USER,
  payload,
});

export const loginPreviousUser = () => ({
  type: LOGIN_PREVIOUS_USER,
});

export const loginUserSuccess = username => ({
  type: LOGIN_USER_SUCCESS,
  username,
});

export const loginUserError = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

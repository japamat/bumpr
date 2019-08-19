import { 
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_PREVIOUS_USER,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_ERROR,
} from './constants';

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

export const getUserInfoSuccess = userData => ({
  type: GET_USER_INFO_SUCCESS,
  userData,
});

export const getUserInfoError = username => ({
  type: GET_USER_INFO_ERROR,
  username,
});

export const getUserInfo = username => ({
  type: GET_USER_INFO,
  username,
});

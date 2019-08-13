import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR, LOAD_USER_FOLLOWING, LOAD_USER_FOLLOWING_SUCCESS } from './constants';

export const loadUser = (username, feedOffset) => {
  console.log(`in homepage action: `, username);
  
  return ({
    type: LOAD_USER,
    username,
    feedOffset,
  })
};

export const loadUserSuccess = userData => ({
  type: LOAD_USER_SUCCESS,
  userData,
});

export const loadUserError = error => ({
  type: LOAD_USER_ERROR,
  error,
});

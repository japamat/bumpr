import {
  LOAD_USER_FEED,
  LOAD_USER_FEED_SUCCESS,
  LOAD_USER_FEED_ERROR,
} from './constants';

export const loadUserFeed = (username, feedOffset) => ({
    type: LOAD_USER_FEED,
    username,
    feedOffset,
  });

export const loadUserSuccess = feed => ({
  type: LOAD_USER_FEED_SUCCESS,
  feed,
});

export const loadUserError = error => ({
  type: LOAD_USER_FEED_ERROR,
  error,
});

import produce from 'immer';
import {
  LOAD_USER_FEED,
  LOAD_USER_FEED_SUCCESS,
  LOAD_USER_FEED_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: true,
  errorUser: false,
  feed: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER_FEED:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_USER_FEED_SUCCESS:
        draft.loading = false;
        draft.feed = action.feed;
        break;

      case LOAD_USER_FEED_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
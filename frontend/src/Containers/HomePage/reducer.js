import produce from 'immer';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loadingUser: false,
  errorUser: false,
  userData: false,
  feedOffset: 0,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER:
        draft.loadingUser = true;
        draft.error = false;
        break;

      case LOAD_USER_SUCCESS:
        draft.loadingUser = false;
        draft.userData = action.userData;
        draft.feedOffset = state.feedOffset + 50;
        break;

      case LOAD_USER_ERROR:
        draft.error = action.error;
        draft.loadingUser = false;
        break;
    }
  });

export default appReducer;
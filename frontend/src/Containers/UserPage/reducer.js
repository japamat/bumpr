import produce from 'immer';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loadingUser: true,
  errorUser: false,
  userData: false,
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
        break;

      case LOAD_USER_ERROR:
        draft.error = action.error;
        draft.loadingUser = false;
        break;
    }
  });

export default appReducer;
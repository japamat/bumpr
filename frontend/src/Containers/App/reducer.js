/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_USER_INFO_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: 'test this fuckin thing',
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
        draft.loading = true;
        draft.error = false;
        break;

      case LOGIN_USER_SUCCESS:
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case GET_USER_INFO_SUCCESS:
        console.log('in app reducer', action);
        
        draft.loading = false;
        draft.userData = action.userData.about;
        break;

      case LOGIN_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
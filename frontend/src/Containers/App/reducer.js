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
import themes from '../../utils/themes';
import { TOGGLE_THEME } from '../Sidebar/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: false,
  theme: themes.darkTheme,
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
        draft.loading = false;
        draft.userData = action.userData.about;
        break;

      case LOGIN_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case TOGGLE_THEME:
        draft.theme = state.theme === themes.darkTheme
          ? themes.lightTheme
          : themes.darkTheme;
        break;
    }
  });

export default appReducer;
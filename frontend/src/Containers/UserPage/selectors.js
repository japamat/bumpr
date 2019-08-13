import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectUserPage = state => state.userPage || initialState;

const makeSelectUserData = () =>
  createSelector(
    selectUserPage,
    userPageState => userPageState.userData,
  );


const makeSelectLoadingUser = () =>
  createSelector(
    selectUserPage,
    userPageState => userPageState.loadingUser,
  );

const makeSelectUserMessagesOffset = () =>
  createSelector(
    selectUserPage,
    userPageState => userPageState.messagesOffset,
  );

const makeSelectErrorUser = () =>
  createSelector(
    selectUserPage,
    userPageState => userPageState.errorUser,
  );

export {
  makeSelectUserData,
  makeSelectLoadingUser,
  makeSelectErrorUser,
  makeSelectUserMessagesOffset,
};
import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectHome = state => state.home || initialState;

const makeSelectCurrentUserData = () =>
  createSelector(
    selectHome,
    homeState => homeState.userData,
  );


const makeSelectHomeLoadingUser = () =>
  createSelector(
    selectHome,
    homeState => homeState.loadingUser,
  );


const makeSelectHomeErrorUser = () =>
  createSelector(
    selectHome,
    homeState => homeState.errorUser,
  );

export {
  makeSelectCurrentUserData,
  makeSelectHomeLoadingUser,
  makeSelectHomeErrorUser,
};
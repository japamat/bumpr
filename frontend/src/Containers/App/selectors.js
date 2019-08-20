import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

const selectGlobal = state => state.global || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectUserData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

const makeSelectAppTheme = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.theme,
  );

export {
  makeSelectLocation,
  makeSelectUserData,
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectAppTheme,
};

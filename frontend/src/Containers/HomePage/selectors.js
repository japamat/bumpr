import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectHome = state => state.home || initialState;

const makeSelectCurrentUserFeed = () =>
  createSelector(
    selectHome,
    homeState => homeState.feed,
  );

const makeSelectHomeLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const makeSelectHomeFeedOffset = () =>
  createSelector(
    selectHome,
    homeState => homeState.feedOffset,
  );

const makeSelectHomeErrorUser = () =>
  createSelector(
    selectHome,
    homeState => homeState.errorUser,
  );

export {
  makeSelectCurrentUserFeed,
  makeSelectHomeLoading,
  makeSelectHomeErrorUser,
  makeSelectHomeFeedOffset,
};
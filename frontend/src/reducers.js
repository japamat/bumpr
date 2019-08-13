import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
import appReducer from './Containers/App/reducer';
import homePageReducer from './Containers/HomePage/reducer';
import userPageReducer from './Containers/UserPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const rootReducer = combineReducers({
  global: appReducer,
  home: homePageReducer,
  userPage: userPageReducer,
  router: connectRouter(history),
});

export default rootReducer;

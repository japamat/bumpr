/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOGIN_USER = `frontend/App/LOGIN_USER`;
export const GET_USER_INFO = `frontend/App/GET_USER_INFO`;
export const GET_USER_INFO_SUCCESS = `frontend/App/GET_USER_INFO_SUCCESS`;
export const GET_USER_INFO_ERROR = `frontend/App/GET_USER_INFO_ERROR`;
export const LOGIN_PREVIOUS_USER = `frontend/App/LOGIN_PREVIOUS_USER`;
export const LOGIN_USER_SUCCESS = `frontend/App/LOGIN_USER_SUCCESS`;
export const LOGIN_USER_ERROR = `frontend/App/LOGIN_USER_ERROR`;

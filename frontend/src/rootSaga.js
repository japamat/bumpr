import { call, put, takeLatest, all } from 'redux-saga/effects';
import { loginSagas } from './Containers/LoginPage/saga';
import { homeSagas } from './Containers/HomePage/saga';
import { userPageSagas } from './Containers/UserPage/saga';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...homeSagas,
    ...userPageSagas
  ])
}
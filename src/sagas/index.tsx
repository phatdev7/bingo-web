import { all, fork } from 'redux-saga/effects';
import { watchAccessTokenAsync, watchRegisterAsync } from './userSaga';
import { watchGetCurrentRoomAsync, watchAddCurrentRoomAsync } from './roomSaga';
import { watchGetCardsAsync } from './cardSaga';

export default function*() {
  yield all([fork(watchAccessTokenAsync)]);
  yield all([fork(watchRegisterAsync)]);
  yield all([fork(watchGetCurrentRoomAsync)]);
  yield all([fork(watchAddCurrentRoomAsync)]);
  yield all([fork(watchGetCardsAsync)]);
}

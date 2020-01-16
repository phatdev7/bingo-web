import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_ROOM, ADD_ROOM } from '../reducers/roomReducer';

export function* watchGetCurrentRoomAsync() {
  yield takeLatest('WATCH_GET_CURRENT_ROOM', workerGetCurrentRoomAsync);
}

function* workerGetCurrentRoomAsync() {
  try {
    const res = yield call(requestGetCurrentRoom);
    yield put({
      type: UPDATE_ROOM,
      payload: res.data.rooms,
    });
  } catch (error) {
    yield put({
      type: UPDATE_ROOM,
      payload: [],
    });
  }
}

const requestGetCurrentRoom = () => {
  return REST.post('room/current');
};

///////////////////////////////////////////////////////

export function* watchAddCurrentRoomAsync() {
  yield takeLatest('WATCH_ADD_CURRENT_ROOM', workerAddCurrentRoomAsync);
}

function* workerAddCurrentRoomAsync(action: any) {
  try {
    const res = yield call(requestAddCurrentRoom, action.payload);
    yield put({
      type: ADD_ROOM,
      payload: res.data,
    });

    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    // yield put({
    //   type: ADD_ROOM,
    //   payload: {},
    // });
  }
}

const requestAddCurrentRoom = (value: any) => {
  return REST.post('room', value);
};

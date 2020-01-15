import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_USER } from '../reducers/userReducer';

export function* watchAccessTokenAsync() {
  yield takeLatest('WATCH_ACCESS_TOKEN', workerAccessTokenAsync);
}

function* workerAccessTokenAsync(action: any) {
  try {
    const res = yield call(requestAccessToken);

    yield put({
      type: UPDATE_USER,
      payload: res.data.user,
    });

    if (action.callback) {
      action.callback(null, res.data.user);
    }
  } catch (error) {
    if (action.callback) {
      action.callback(error);
    }
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestAccessToken = () => {
  return REST.post('user/access_token');
};

///////////////////////////////////////////////////////

export function* watchRegisterAsync() {
  yield takeLatest('WATCH_REGISTER', workerRegisterAsync);
}

function* workerRegisterAsync(action: any) {
  try {
    const res = yield call(requestRegister, action.payload);

    yield put({
      type: UPDATE_USER,
      payload: res.data.user,
    });

    if (action.callback) {
      action.callback(null, res.data.user);
    }
  } catch (error) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestRegister = (name: string) => {
  return REST.post('user/register', { name });
};

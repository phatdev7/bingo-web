import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_TOKEN } from '../reducers/tokenReducer';

export function* watchAccessTokenAsync() {
  yield takeLatest('WATCH_ACCESS_TOKEN', workerAccessTokenAsync);
}

function* workerAccessTokenAsync(action: any) {
  try {
    const res = yield call(requestAccessToken);

    yield put({
      type: UPDATE_TOKEN,
      payload: res.data.token,
    });

    if (action.callback) {
      action.callback(null, res.data.token);
    }
  } catch (error) {
    yield put({
      type: UPDATE_TOKEN,
      payload: {},
    });
  }
}

const requestAccessToken = () => {
  return REST.post('access_token');
};

///////////////////////////////////////////////////////

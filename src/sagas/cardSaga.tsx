import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_CARD } from '../reducers/cardReducer';

export function* watchGetCardsAsync() {
  yield takeLatest('WATCH_GET_CARDS', workerGetCardsAsync);
}

function* workerGetCardsAsync() {
  try {
    const res = yield call(requestGetCards);
    yield put({
      type: UPDATE_CARD,
      payload: res.data.cards,
    });
  } catch (error) {
    yield put({
      type: UPDATE_CARD,
      payload: [],
    });
  }
}

const requestGetCards = () => {
  return REST.get('/cards');
};

///////////////////////////////////////////////////////

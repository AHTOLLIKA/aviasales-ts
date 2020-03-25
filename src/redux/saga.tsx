import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import axios from 'axios';
import * as actions from './actions';

function* fetchSearchId(): SagaIterator {
  const res = yield call(axios.get, 'https://front-test.beta.aviasales.ru/search');
  const { searchId } = res.data;

  yield put(actions.setSearchId(searchId));
}

export default function* rootSaga(): SagaIterator {
  yield takeEvery('FETCH_SEARCH_ID', fetchSearchId);
}

import { fork, take, cancel } from 'redux-saga/effects';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../actionTypes';
import { webSocketSaga } from './webSocket.saga';

// eslint-disable-next-line
export default function* () {
  const initAction = yield take(INIT_WEBSOCKET);
  while (initAction) {
    const wsTask = yield fork(webSocketSaga, initAction);
    yield take(CANCEL_WEBSOCKET);
    yield cancel(wsTask);
  }
}

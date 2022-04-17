import { fork, take, cancel } from 'redux-saga/effects';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../actionTypes';
import { webSocketSaga } from './webSocket.saga';

export const websocketState = {
  interval: undefined,
  cancel: false
};

// eslint-disable-next-line
export default function* () {
  const initAction = yield take(INIT_WEBSOCKET);
  while (initAction) {
    const wsTask = yield fork(webSocketSaga, initAction, websocketState);
    yield take(CANCEL_WEBSOCKET);
    yield cancel(wsTask);
  }
}

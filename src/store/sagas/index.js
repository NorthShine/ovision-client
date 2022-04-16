import { fork, take, cancel } from 'redux-saga/effects';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../actionTypes';
import { webSocketSaga } from './webSocket.saga';

// eslint-disable-next-line
export default function* () {
  // grouping all sagas
  // yield all([fork(webSocketSaga)]);

  const wsTransferInverval = {
    value: undefined
  };

  while (yield take(INIT_WEBSOCKET)) {
    const wsTask = yield fork(webSocketSaga, wsTransferInverval);
    yield take(CANCEL_WEBSOCKET);
    clearInterval(wsTransferInverval.value);
    yield cancel(wsTask);
  }
}

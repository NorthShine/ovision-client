import { fork, take, cancel } from 'redux-saga/effects';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../actionTypes';
import { webSocketSaga } from './webSocket.saga';

const wsTransferInverval = {
  value: undefined
};

// eslint-disable-next-line
export default function* () {
  // grouping all sagas
  // yield all([fork(webSocketSaga)]);

  const initAction = yield take(INIT_WEBSOCKET);
  while (initAction) {
    const wsTask = yield fork(webSocketSaga, initAction, wsTransferInverval);
    yield take(CANCEL_WEBSOCKET);
    clearInterval(wsTransferInverval.value);
    yield cancel(wsTask);
  }
}

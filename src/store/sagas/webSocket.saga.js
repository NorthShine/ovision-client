import { call, put, take, all, cancelled, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setStreamSource } from '../actionCreators/stream.actionCreators';
import { FPS } from '../../constants';
import {
  CANCEL_STREAM,
  SET_STREAM_IS_RUNNING,
  SET_CANCELLING
} from '../actionTypes';
// import { Buffer } from 'buffer';

const createWebSocketConnection = roomId => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET_URL}ws_a/${roomId}`
    );

    socket.onopen = function () {
      console.log('connection to ws');
      resolve(socket);
    };

    socket.onerror = function (event) {
      console.log(event);
      reject(event);
    };
  });
};

const initWebsocketChannel = ({ isRunning, socket, stream }) => {
  return eventChannel(emit => {
    // setInterval(() => {
    //   const result = window.btoa('ping');
    //   const blob = new Blob([result], {
    //     type: 'text/plain'
    //   });
    //   socket.send(blob);
    // }, 5000);

    socket.onmessage = event => {
      emit(event.data);
    };

    socket.onclose = () => {
      console.log('Connection closed');
      emit(END);
    };

    if (isRunning) {
      setInterval(async () => {
        const [track] = stream.getVideoTracks();
        const imageCapture = new ImageCapture(track);
        const frame = await imageCapture.grabFrame();
        const canvas = document.createElement('canvas');
        canvas.width = frame.width;
        canvas.height = frame.height;
        const ctx = canvas.getContext('bitmaprenderer');
        if (ctx) {
          ctx.transferFromImageBitmap(frame);
        } else {
          canvas.getContext('2d').drawImage(frame, 0, 0);
        }
        canvas.toBlob(blob => {
          if (socket.bufferedAmount < 2) {
            socket.send(blob);
            console.log('frame sent');
          }
        });
      }, 1000 / FPS);
    }

    return () => {
      socket.onmessage = null;
    };
  });
};

const createStream = async () => {
  try {
    if (!navigator.mediaDevices.getUserMedia) {
      throw new Error('No getUserMedia method available');
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    return stream;
  } catch (err) {
    throw err;
  }
};

export function* webSocketSaga(initAction) {
  try {
    const { payload: roomId } = initAction;
    yield put({ type: SET_STREAM_IS_RUNNING, payload: true });
    const state = yield select();
    const { isRunning, isCancelling } = state.stream;
    const socket = yield call(createWebSocketConnection, roomId);
    const stream = yield call(createStream);

    const webSocketChannel = yield call(initWebsocketChannel, {
      isRunning,
      socket,
      stream
    });
    while (true) {
      console.log(isCancelling);
      if (!isCancelling) {
        const data = yield take(webSocketChannel);
        yield all([put(setStreamSource(data))]);
      } else {
        yield put({ type: SET_CANCELLING, payload: false });
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      yield all([
        put({ type: CANCEL_STREAM }),
        put({ type: SET_STREAM_IS_RUNNING, payload: false })
      ]);
    }
  }
}

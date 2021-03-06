import { call, put, take, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setStreamSource } from '../actionCreators/stream.actionCreators';
import { FPS } from '../../constants';
import { blobToBase64 } from '../../utils';

const createWebSocketConnection = roomId => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`${process.env.REACT_APP_URL}/ws_a/${roomId}`);

    socket.onopen = function () {
      resolve(socket);
    };

    socket.onerror = function (event) {
      reject(event);
    };
  });
};

const initWebsocketChannel = (socket, roomId, stream) => {
  return eventChannel(emit => {
    socket.onmessage = event => {
      emit(event.data);
    };

    socket.onclose = () => {
      emit(END);
    };

    const intervalId = setInterval(async () => {
      const [track] = stream.getVideoTracks();
      const imageCapture = new ImageCapture(track);
      const frame = await imageCapture.takePhoto();
      const buffer = await blobToBase64(frame);
      socket.send(buffer);
    }, 1000 / FPS);

    return () => {
      socket.onmessage = null;
      clearInterval(intervalId);
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

export function* webSocketSaga(connectAction) {
  try {
    const { payload: roomId } = connectAction;
    const socket = yield call(createWebSocketConnection, roomId);
    const stream = yield call(createStream);
    const webSocketChannel = yield call(
      initWebsocketChannel,
      socket,
      roomId,
      stream
    );
    while (true) {
      const data = yield take(webSocketChannel);
      yield all([put(setStreamSource(data))]);
    }
  } catch (err) {
    console.log(err);
  }
}

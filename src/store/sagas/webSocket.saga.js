import { call, put, take, all, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setStreamSource } from '../actionCreators/stream.actionCreators';
import { FPS } from '../../constants';
// import { Buffer } from 'buffer';

const createWebSocketConnection = roomId => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET_URL}ws_a/${roomId}`
    );

    socket.onopen = function () {
      resolve(socket);
    };

    socket.onerror = function (event) {
      console.log(event);
      reject(event);
    };
  });
};

const initWebsocketChannel = (socket, roomId, wsTransferInverval, stream) => {
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

    wsTransferInverval.value = setInterval(async () => {
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

    return () => {
      socket.onmessage = null;
      clearInterval(wsTransferInverval.value);
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

export function* webSocketSaga(wsTransferInverval) {
  try {
    const {
      stream: { roomId }
    } = yield select();
    const socket = yield call(createWebSocketConnection, roomId);
    const stream = yield call(createStream);
    const webSocketChannel = yield call(
      initWebsocketChannel,
      socket,
      roomId,
      wsTransferInverval,
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

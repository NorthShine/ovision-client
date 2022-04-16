import { call, put, take, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setStreamSource } from '../actionCreators/stream.actionCreators';
import { FPS } from '../../constants';

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

const initWebsocketChannel = (socket, roomId, stream) => {
  return eventChannel(emit => {
    socket.onmessage = event => {
      console.log(1);
      emit(event.data);
    };

    socket.onclose = () => {
      console.log('Connection closed');
      emit(END);
    };

    const intervalId = setInterval(async () => {
      const [track] = stream.getVideoTracks();
      const imageCapture = new ImageCapture(track);
      const frame = await imageCapture.grabFrame();
      const canvas = document.createElement('canvas');
      // resize it to the size of our ImageBitmap
      canvas.width = frame.width;
      canvas.height = frame.height;
      // try to get a bitmaprenderer context
      let ctx = canvas.getContext('bitmaprenderer');
      if (ctx) {
        // transfer the ImageBitmap to it
        ctx.transferFromImageBitmap(frame);
      } else {
        // in case someone supports createImageBitmap only
        // twice in memory...
        canvas.getContext('2d').drawImage(frame, 0, 0);
      }
      // get it back as a Blob
      canvas.toBlob(blob => {
        if (socket.bufferedAmount === 0) {
          console.log(blob);
          socket.send(blob);
          console.log('frame sent');
        }
      });
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

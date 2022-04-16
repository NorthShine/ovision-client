import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import api from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../../store/actionTypes';
import { blobToBase64 } from '../../utils';
import { FPS } from '../../constants';

export const Home = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  // const stream = useSelector(state => state.stream);
  const [streamLoader, setStreamLoader] = useState(false);
  const [stream, setStream] = useState();
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0
  });

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia(videoConstraints).then(stream => {
  //     setInterval(async () => {
  //       try {
  //         if (stream) {
  //           const [track] = stream.getVideoTracks();
  //           const imageCapture = new ImageCapture(track);
  //           const frame = await imageCapture.grabFrame();
  //           setResolution(state => {
  //             return {
  //               width: frame.width,
  //               height: frame.height
  //             };
  //           });
  //           const canvas = canvasRef.current;
  //           if (canvas) {
  //             const context = canvas.getContext('2d');
  //             context.drawImage(frame, 10, 10);
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }, 1000 / FPS);
  //   });
  // }, []);

  useEffect(() => {
    if (stream) {
      console.log(stream);
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        context.drawImage(stream.source, 10, 10);
      }
    }
  }, [stream]);

  const startWebsocket = async () => {
    try {
      setStreamLoader(true);
      const res = await api.getUniqueRoomId();
      const roomId = res.data.room_id;
      dispatch({ type: INIT_WEBSOCKET, payload: roomId });
    } catch (err) {
      throw err;
    } finally {
      setStreamLoader(false);
    }
  };

  const stopWebsocket = () => {
    dispatch({ type: CANCEL_WEBSOCKET });
  };

  return (
    <div className="Home d-flex justify-content-center flex-column">
      {!streamLoader || stream?.source ? (
        <canvas
          className="Home__video"
          height={resolution.height}
          width={resolution.width}
          ref={canvasRef}
        />
      ) : (
        <div className="Home__video">
          <Spinner animation="grow" variant="primary" />
        </div>
      )}
      <Container className="Home__buttons">
        <Button onClick={startWebsocket}>Start</Button>
        <Button variant="danger" onClick={stopWebsocket}>
          Stop
        </Button>
      </Container>
    </div>
  );
};

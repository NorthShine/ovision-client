import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import api from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../../store/actionTypes';

export const Home = () => {
  const canvasRef = useRef(null);
  const liveVideoRef = useRef(null);
  const dispatch = useDispatch();
  const stream = useSelector(state => state.stream);
  const [streamLoader, setStreamLoader] = useState(false);
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (stream?.source) {
      if (!streamLoader) setStreamLoader(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        const source = 'data:image/jpeg;base64,' + stream.source;
        var image = new Image();
        image.onload = function () {
          setResolution(state => {
            return {
              width: image.width,
              height: image.height
            };
          });
          context.drawImage(image, 0, 0);
        };
        image.src = source;
      }
    }
    // eslint-disable-next-line
  }, [stream]);

  const startWebsocket = async () => {
    try {
      setStreamLoader(true);
      const liveStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      const video = liveVideoRef.current;
      if (video) {
        video.src = liveStream;
        video.play();
      }
      const res = await api.getUniqueRoomId();
      const roomId = res.data.room_id;
      dispatch({ type: INIT_WEBSOCKET, payload: roomId });
    } catch (err) {
      throw err;
    }
  };

  const stopWebsocket = () => {
    dispatch({ type: CANCEL_WEBSOCKET });
  };

  return (
    <div className="Home d-flex justify-content-center flex-column">
      {!streamLoader || stream?.source ? (
        <Row>
          <Col>
            <video
              className="Home__video"
              height={resolution.height}
              width={resolution.width}
              ref={liveVideoRef}
            />
          </Col>
          <Col>
            <canvas
              className="Home__video"
              height={resolution.height}
              width={resolution.width}
              ref={canvasRef}
            />
          </Col>
        </Row>
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

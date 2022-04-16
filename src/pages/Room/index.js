import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../../store/actionTypes';
import { FPS } from '../../constants';

export const Room = () => {
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
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        setInterval(async () => {
          try {
            if (stream) {
              const [track] = stream.getVideoTracks();
              const imageCapture = new ImageCapture(track);
              const frame = await imageCapture.grabFrame();
              setResolution(state => {
                return {
                  width: frame.width,
                  height: frame.height
                };
              });
              const canvas = liveVideoRef.current;
              if (canvas) {
                const context = canvas.getContext('2d');
                context.drawImage(frame, 10, 10);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }, 1000 / FPS);
      });
  }, []);

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
      dispatch({ type: INIT_WEBSOCKET });
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
            <canvas
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

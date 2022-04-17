import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../../store/actionTypes';
import { UserVideo } from '../../components/UserVideo';
import { useParams } from 'react-router';
import api from '../../api';

export const FaceId = () => {
  const dispatch = useDispatch();
  const [faceIdCreated, setFaceIdCreated] = useState(false);
  const [input, setInput] = useState('');
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0
  });
  const liveVideoRef = useRef(null);
  const [liveStream, setLiveStream] = useState();
  let { roomId } = useParams();
  if (!roomId) roomId = 1;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        setLiveStream(stream);
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
        }, 1000 / 16);
      });
  }, []);

  const createFaceId = async event => {
    try {
      event.preventDefault();
      if (!navigator.mediaDevices.getUserMedia) {
        console.error('No getUserMedia method available');
      }
      const [track] = liveStream.getVideoTracks();
      const imageCapture = new ImageCapture(track);
      const frame = await imageCapture.takePhoto();
      // await api.createFaceId({
      //   name: input,
      //   frame
      // });
      setFaceIdCreated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const startWebsocket = async () => {
    try {
      dispatch({ type: INIT_WEBSOCKET, payload: roomId });
    } catch (err) {
      throw err;
    }
  };

  const stopWebsocket = () => {
    dispatch({ type: CANCEL_WEBSOCKET });
  };

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  return (
    <div className="FaceId d-flex justify-content-center flex-column">
      <Row className="d-flex justify-content-center">
        <Col className="justify-content-center align-items-center" xs={6}>
          {faceIdCreated ? (
            <Fragment>
              <UserVideo />
              <Container className="FaceId__buttons">
                <Button onClick={startWebsocket}>Start</Button>
                <Button variant="danger" onClick={stopWebsocket}>
                  Stop
                </Button>
              </Container>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="text-center mb-3">Create Your FaceId</h1>
              <div className="FaceId__live_video_wrapper">
                <canvas
                  className="FaceId__live_video"
                  height={resolution.height}
                  width={resolution.width}
                  ref={liveVideoRef}
                />
              </div>
              <Form className="FaceId__form" onSubmit={createFaceId}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Create your FaceId
                </Button>
              </Form>
            </Fragment>
          )}
        </Col>
      </Row>
    </div>
  );
};

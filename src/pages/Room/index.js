import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { CANCEL_WEBSOCKET, INIT_WEBSOCKET } from '../../store/actionTypes';
import { UserVideo } from '../../components/UserVideo';
import { useParams } from 'react-router';

export const Room = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

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

  return (
    <div className="Room d-flex justify-content-center flex-column">
      <Row>
        <Col xs={6}>
          <UserVideo />
        </Col>
        <Col xs={6}>
          <UserVideo />
        </Col>
      </Row>
      <Container className="Room__buttons">
        <Button onClick={startWebsocket}>Start</Button>
        <Button variant="danger" onClick={stopWebsocket}>
          Stop
        </Button>
      </Container>
    </div>
  );
};

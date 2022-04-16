import React from 'react';
import './styles.scss';
import { Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import pattern from '../../assets/images/Soft.jpg';

export const Home = () => {
  return (
    <div className="Home d-flex justify-content-center flex-column">
      <Container>
        <Row>
          <Col className="WelcomeHPage" xl={12}>
            <h3>Привет, добро пожаловать на сайт - видеочатрулетку!</h3>
          </Col>
        </Row>
      </Container>
      <Row className="Home__row d-flex justify-content-center ">
        <Col md={6} xs={12} className="MainContainer">
          <ListGroup className="ListGroup" as="ol" numbered>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge className="li-b" bg="primary" pill>
                1
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className=" d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                1
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                2
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

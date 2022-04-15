import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import api from '../../api';
import { StreamSettings } from '../../components/StreamSettings';
import { UserParams } from '../../components/UserParams';
import { VideoStream } from '../../components/VideoStream';
import { useLoader } from '../../hooks/useLoader';
import './styles.scss';

export const Home = () => {
  const [image, setImage] = useState(null);
  const loader = useLoader();

  useEffect(() => {
    loader.show();
    api
      .getRandomFox()
      .then(res => {
        setImage(res.data.image);
      })
      .catch(err => console.log(err))
      .finally(() => loader.hide());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Home">
      <Row>
        <Col xl={3}>
          <StreamSettings/>
        </Col>
        <Col xs={6}>
          <VideoStream />
        </Col>
        <Col xs={3}>
          <UserParams />
        </Col>
      </Row>
      {/* {image && <img src={image} alt="foxy" />} */}
    </div>
  );
};
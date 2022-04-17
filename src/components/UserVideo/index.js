import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './styles.scss';

export const UserVideo = () => {
  const canvasRef = useRef(null);
  const stream = useSelector(state => state.stream);
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (stream?.source) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        const source = 'data:image/jpeg;base64,' + stream.source;
        var image = new Image();
        image.onload = function () {
          const { width, height } = image;
          if (!resolution.width) setResolution({ width, height });
          context.drawImage(image, 0, 0);
        };
        image.src = source;
      }
    }
    // eslint-disable-next-line
  }, [stream]);

  return (
    <div className="UserVideo d-flex justify-content-center flex-column">
      {stream?.source ? (
        <canvas
          className="UserVideo__video"
          height={resolution.height}
          width={resolution.width}
          ref={canvasRef}
        />
      ) : (
        <div className="UserVideo__loader">
          <Spinner animation="grow" variant="primary" />
        </div>
      )}
    </div>
  );
};

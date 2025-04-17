import React from 'react';

const BackgroundImage = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    ></div>
  );
};

export default BackgroundImage;
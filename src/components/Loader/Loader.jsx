import React from 'react';

import { ThreeDots } from 'react-loader-spinner';
import { Container } from './Loader.style';

const Loader = () => {
  return (
    <Container>
      <ThreeDots color="#1d2bac" height={80} width={80} />
    </Container>
  );
};

export default Loader;

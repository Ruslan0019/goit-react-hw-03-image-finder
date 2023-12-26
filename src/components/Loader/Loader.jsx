import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Div>
      <ThreeDots color="#1d2bac" height={80} width={80} />
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Loader;

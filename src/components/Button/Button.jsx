import React from 'react';
import { ButtonLoadMore, Container } from './Button.style';

const Button = ({ onClick }) => {
  return (
    <Container>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load more
      </ButtonLoadMore>
    </Container>
  );
};

export default Button;

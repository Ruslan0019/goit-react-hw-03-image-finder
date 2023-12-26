import React, { useEffect } from 'react';
import styled from 'styled-components';

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay className="overlay" onClick={onClose}>
      <ModalContainer>
        <img src={imageUrl} alt="" />
      </ModalContainer>
    </Overlay>
  );
};
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
export default Modal;

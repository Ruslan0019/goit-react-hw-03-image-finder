import React, { useEffect } from 'react';
import { ModalContainer, Overlay } from './Modal.style';

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

export default Modal;

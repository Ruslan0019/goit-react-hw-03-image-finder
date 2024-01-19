import React from 'react';
import { ModalContainer, Overlay } from './Modal.style';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { imageUrl, onClose } = this.props;

    return (
      <Overlay className="overlay" onClick={onClose}>
        <ModalContainer>
          <img src={imageUrl} alt="" />
        </ModalContainer>
      </Overlay>
    );
  }
}

export default Modal;

import React from 'react';
import { Img, Item } from './ImageGalleryItem.style';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <Item className="gallery-item" onClick={() => onClick(image.largeImageURL)}>
      <Img src={image.webformatURL} alt="" />
    </Item>
  );
};

export default ImageGalleryItem;

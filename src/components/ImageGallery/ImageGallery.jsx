import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { List } from './ImageGallery.style';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <List className="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
      ))}
    </List>
  );
};

export default ImageGallery;

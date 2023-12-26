import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchData(newQuery, 1);
  };

  const fetchData = async (query, pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=40489521-2d233b9ce133180f8f85686cd&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchData(query, page);
  };

  const openModal = imageUrl => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={loadMore} />}
      {modalImageUrl && <Modal imageUrl={modalImageUrl} onClose={closeModal} />}
    </div>
  );
};

export default App;

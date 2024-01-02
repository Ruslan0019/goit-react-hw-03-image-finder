import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    modalImageUrl: null,
  };

  handleSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    });
    this.fetchData(newQuery, 1);
  };

  fetchData = async (query, pageNumber) => {
    try {
      this.setState({ loading: true });

      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=40489521-2d233b9ce133180f8f85686cd&image_type=photo&orientation=horizontal&per_page=12`
      );

      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.fetchData(this.state.query, this.state.page);
  };

  openModal = imageUrl => {
    this.setState({ modalImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ modalImageUrl: null });
  };
  render() {
    const { query, images, loading, modalImageUrl } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.loadMore} />}
        {modalImageUrl && (
          <Modal imageUrl={modalImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
export default App;

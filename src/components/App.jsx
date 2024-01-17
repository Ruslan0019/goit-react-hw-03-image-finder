import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import fetchData from './api/api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    modalImageUrl: null,
  };

  componentDidMount() {
    const { query } = this.state;
    if (query.trim() !== '') {
      this.fetchData(query, 1);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if ((prevState.query !== query && page === 1) || prevState.page !== page) {
    }
  }

  handleSubmit = newQuery => {
    this.setState(
      {
        query: newQuery,
        images: [],
        page: 1,
        loading: true,
      },
      () => {
        this.fetchData(newQuery, 1);
      }
    );
  };

  fetchData = async (query, pageNumber) => {
    try {
      const data = await fetchData(query, pageNumber);

      this.setState(prevState => ({
        images: [...prevState.images, ...data],
        page: prevState.page + 1,
        loading: false,
      }));
    } catch (error) {
      console.error('Error while receiving data:', error);
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    const { query, page } = this.state;
    this.setState({ loading: true }, () => {
      this.fetchData(query, page);
    });
  };

  openModal = imageUrl => {
    this.setState({ modalImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ modalImageUrl: null });
  };

  render() {
    const { images, loading, modalImageUrl } = this.state;
    const allImagesLoaded = images.length === 0 && !loading;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {images.length >= 12 && !allImagesLoaded && (
          <Button onClick={this.loadMore} />
        )}
        {modalImageUrl && (
          <Modal imageUrl={modalImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;

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

  // componentDidMount() {
  //   const { imageUrl } = this.props;
  //   const img = new Image();
  //   img.src = imageUrl;
  //   img.onload = () => this.setState({ imageLoaded: true });
  // }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if ((prevState.query !== query && page === 1) || prevState.page !== page) {
      this.fetchData(query, page);
    }
  }

  handleSubmit = newQuery => {
    const trimmedQuery = newQuery.trim();
    if (trimmedQuery !== '') {
      this.setState({
        query: trimmedQuery,
        images: [],
        page: 1,
      });
    }
  };

  fetchData = async (query, pageNumber) => {
    this.setState({ loading: true });
    try {
      const data = await fetchData(query, pageNumber);

      this.setState(prevState => ({
        images: [...prevState.images, ...data],
        page: pageNumber,
        loading: false,
      }));
    } catch (error) {
      console.error('Error while receiving data:', error);
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = imageUrl => {
    this.setState({ modalImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ modalImageUrl: null });
  };

  render() {
    const { images, loading, modalImageUrl, page } = this.state;
    const allImagesLoaded = !images.length && !loading;
    const noMoreImagesToLoad =
      allImagesLoaded ||
      (page > 1 && images.length % 12 !== 0) ||
      images.length < 12;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {!noMoreImagesToLoad && images.length >= 12 && (
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

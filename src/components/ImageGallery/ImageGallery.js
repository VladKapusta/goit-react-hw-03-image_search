import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    imagesArr: [],
    page: 1,
    totalHits: null,
    status: '',
    error: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {

    const { searchName, page } = this.props;

    if (prevProps.searchName !== searchName) {
      this.setState({ status: 'panding' });

      axios
        .get('https://pixabay.com/api/', {
          params: {
            q: searchName,
            page: page,
            key: '32442591-eae077292ae639629dac32843',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        })
        .then(({ data }) => {
          if (data.hits.length === 0) {
            return Promise.reject(
              new Error(`За вашим запитом ${searchName} нічого не знайдено`)
            );
          }
          console.log(data);
          return this.setState({
            imagesArr: data.hits,
            status: 'resolved',
            totalHits: data.totalHits,
          });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
    if (this.state.page !== prevState.page) {
      this.setState({ loading: true });
      axios
        .get('https://pixabay.com/api/', {
          params: {
            q: searchName,
            page: this.state.page,
            key: '32442591-eae077292ae639629dac32843',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        })
        .then(({ data }) => {
          this.setState(prevState => ({
            imagesArr: prevState.imagesArr.concat(data.hits),
            totalHits: prevState.totalHits - 12,
          }));
          this.setState({ loading: false });
        });
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, imagesArr, loading, error, totalHits } = this.state;
    if (status === 'panding') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {imagesArr.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <li className="ImageGalleryItem" key={id}>
                  <ImageGalleryItem
                    smallImage={webformatURL}
                    largeImage={largeImageURL}
                  />
                </li>
              );
            })}
          </ul>
          {totalHits > 12 && <Button incr={this.incrPage} loading={loading} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return <p>{error}</p>;
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

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
    status: '',
    error: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'panding' });

      axios
        .get('https://pixabay.com/api/', {
          params: {
            q: this.props.searchName,
            page: this.props.page,
            key: '32442591-eae077292ae639629dac32843',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        })
        .then(({ data }) => {
          if (data.hits.length === 0) {
            return Promise.reject(
              new Error(
                `За вашим запитом ${this.props.searchName} нічого не знайдено`
              )
            );
          }
          return this.setState({
            imagesArr: data.hits,
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }

    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      axios
        .get('https://pixabay.com/api/', {
          params: {
            q: this.props.searchName,
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
          }));
          this.setState({ loading: false });
        });
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  render() {
    const { status, imagesArr, loading, error } = this.state;
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
          <Button incr={this.incrPage} loading={loading} />
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

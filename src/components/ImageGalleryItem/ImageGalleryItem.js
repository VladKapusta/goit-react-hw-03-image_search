import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImage: '',
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  getLargeImage = () => {
    this.setState({ largeImage: this.props.largeImage });
    this.toggleModal();
  };
  render() {
    return (
      <>
        <img
          className="ImageGalleryItem-image"
          src={this.props.smallImage}
          alt=""
          onClick={this.getLargeImage}
        />
        {this.state.showModal && (
          <Modal
            largeImage={this.state.largeImage}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
};

import { Component } from 'react';

export class Modal extends Component {
  clicBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  clicEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.clicEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.clicEscape);
  }
  render() {
    return (
      <div className="Overlay" onClick={this.clicBackdrop}>
        <div className="Modal">
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}

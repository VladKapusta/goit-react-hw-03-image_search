import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    imagesName: '',
  };
  handelSearchForm = e => {
    e.preventDefault();
    if (this.state.imagesName.trim() === '') {
      alert('need a search name');
      return;
    }
    this.props.onSubmit(this.state.imagesName);
    this.setState({ imagesName: '' });
  };

  handleInput = e => {
    this.setState({ imagesName: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handelSearchForm}>
          <button type="Submit" className="SearchForm-button">
            <span className="SearchForm-button-label"></span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imagesName}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

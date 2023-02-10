import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    imagesName: '',
    page: 1,
  };

  getFormValue = imagesName => {
    this.setState({ imagesName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.getFormValue} />
        <ImageGallery
          searchName={this.state.imagesName}
          page={this.state.page}
        />
        <ToastContainer  />
      </div>
    );
  }
}

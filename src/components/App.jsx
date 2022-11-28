import { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    categoryName: '',
    page: 1,
    loaded: 0,
  };
  handleFormSubmit = categoryName => {
    this.setState({ categoryName });
    this.setState({ page: 1 });
    this.setState({ loaded: 12 });
  };

  changeStatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState(prevState => ({ loaded: prevState.loaded + 12 }));
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          categoryName={this.state.categoryName}
          page={this.state.page}
          setPage={this.changeStatePage}
          loaded={this.state.loaded}
        />
      </>
    );
  }
}

App.propTypes = {
  categoryName: PropTypes.string,
};

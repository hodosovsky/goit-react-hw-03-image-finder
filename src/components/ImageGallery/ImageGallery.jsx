import { Component } from 'react';

import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { getGalleryService } from 'services/gallery-service';

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
    error: null,
    total: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const name = this.props.categoryName;
    const page = this.props.page;

    if (prevProps.categoryName !== this.props.categoryName) {
      this.setState({ gallery: [] });
    }

    if (
      prevProps.categoryName !== this.props.categoryName ||
      page !== prevProps.page
    ) {
      this.setState({ loading: true });
      try {
        const newGallery = await getGalleryService(name, page);
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newGallery.data.hits],
        }));
        this.setState({ total: newGallery.data.totalHits });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadmoreClick = () => {
    this.props.setPage();
  };

  render() {
    const { gallery, loading, error, total } = this.state;
    const { loaded } = this.props;
    return (
      <section>
        <ImageGalleryStyled className="gallery">
          {gallery &&
            gallery.map(option => (
              <ImageGalleryItem
                key={option.id}
                img={option.webformatURL}
                largeImageURL={option.largeImageURL}
                alt={option.tags}
              />
            ))}
        </ImageGalleryStyled>

        {loaded < total && <Button onClick={this.handleLoadmoreClick} />}

        {loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {error && <h1>Щось пішло не так...</h1>}
        {total === 0 && <h1>Нічого не знайдено...</h1>}
      </section>
    );
  }
}

ImageGallery.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

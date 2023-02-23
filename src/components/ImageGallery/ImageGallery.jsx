import css from './ImageGallery.module.css';
import PropTypes from 'prop-types'

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Section } from '../Section/Section';

export const ImageGallery =({imgData}) => {
 
    return ( 
      // <Section className="gallery">
          <ul className={css.container}>
            {imgData.map(({ webformatURL, id, tags, largeImageURL }) => (
              <ImageGalleryItem 
              smallImage={webformatURL}
              altPhotos ={tags}
              lagImage={largeImageURL} />
            ))}
          </ul>
      //  </Section>
     
    );
  }

  ImageGallery.propTypes = {
    imgData: PropTypes.arrayOf(
      PropTypes.shape({
        // id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  }


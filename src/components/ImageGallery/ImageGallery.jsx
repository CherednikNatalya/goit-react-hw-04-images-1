import css from './ImageGallery.module.css';
import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';


export const ImageGallery =({imgData}) => {
 
    return ( 
     
          <ul className={css.container}>
            {imgData.map(({ webformatURL, id, tags, largeImageURL }) => (
              <ImageGalleryItem 
              smallImage={webformatURL}
              altPhotos ={tags}
              lagImage={largeImageURL} />
            ))}
          </ul>
    );
  }

  ImageGallery.propTypes = {
    imgData: PropTypes.arrayOf(
      PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  }


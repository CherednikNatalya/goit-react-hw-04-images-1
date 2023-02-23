
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'

import css from './ImageGalleryItem.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const  ImageGalleryItem =({smallImage, altPhotos, lagImage}) => {
 
const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(prevState => (!prevState));
  };


    return (
      <>
        <li className={css['photo-card']} onClick={toggleModal}>
          <LazyLoadImage
            src={smallImage}
            alt={altPhotos}
            effect="blur"
            className={css['fetched-image']}
          />
        </li>
        {showModal && (
          <Modal 
          onClose={toggleModal}
          modalImage={lagImage}
          altPhotos={altPhotos}/>
        
        )}
      </>
    );
  }


  ImageGalleryItem.propTypes ={
    smallImage: PropTypes.string.isRequired, 
    altPhotos: PropTypes.string.isRequired, 
    lagImage: PropTypes.string.isRequired, 
  }

 
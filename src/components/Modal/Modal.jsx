import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root');


export const Modal =({onClose, modalImage, altPhotos}) => {

  useEffect(() => {
    const  handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

return ()=> {
  window.removeEventListener('keydown', handleKeyDown);
}
  },[onClose])



  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

 
    return createPortal (
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>
        <img src={modalImage} alt={altPhotos} />
        </div>
      </div>,
      modalRoot
    );
  }


  Modal.prototype = {
    onClose: PropTypes.func.isRequired, 
    modalImage: PropTypes.string.isRequired,
    altPhotos: PropTypes.string.isRequired
  }
 

  




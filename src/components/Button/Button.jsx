import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({onClick}) => {
  return (
  <div className={css.but}>
    <button type="button" className={css.button} onClick={onClick}>
      Load more
    </button>
    </div>
  );
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired
};










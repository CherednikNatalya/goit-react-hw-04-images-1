import css from './Section.module.css';
import PropTypes from 'prop-types';

export const Section = ({ children}) => (
  <section className={css.section}>
    {children}
  </section>
);

Section.propTypes = {
  class:PropTypes.string,
  children: PropTypes.element,
};

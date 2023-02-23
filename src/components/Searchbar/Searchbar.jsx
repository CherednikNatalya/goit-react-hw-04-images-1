import { useState } from "react";
import css from '../Searchbar/Searchbar.module.css'
import Notiflix from 'notiflix';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types'


export const Searchbar =({onSubmit}) => {
const [formSearch, setFormSearch] =useState ('')
  

  const onChangeHandler = evt => {
    setFormSearch(evt.currentTarget.value.trim());
  };

  const handleSubmit = event => {
    event.preventDefault()
    if (!formSearch.length) {
      Notiflix.Notify.warning('Enter something in the searchbar');
      return;
    }
    onSubmit(formSearch);
    setFormSearch('')
}


  return (
    <header className={css.searchbar}>
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={css['searchForm-button']}>
        <span className={css['button-label']}>
          <ImSearch className={css.icon} />
          </span>
      </button>
  
      <input
        className={css.input}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
        value={formSearch}
        onChange={onChangeHandler}
      />
    </form>
  </header>
  )
}

Searchbar.prototype ={
  onSubmit: PropTypes.func.isRequired,
}





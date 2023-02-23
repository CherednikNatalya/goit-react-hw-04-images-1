import { useState, useEffect, useRef } from "react";
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
// import { Section } from './Section/Section';
import css from '../components/App.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notiflix from 'notiflix';
import axios from "axios";

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  rejected: 'rejected',
};

const API_KEY = '31541189-0a437f1c4a0bdb60103b05fd6';
const BASE_URL = 'https://pixabay.com/api/'

export const App =() => {
 
  const [searchQuery, setSearchQuery] =useState('')
  const [imgData, setImgData] =useState([''])
  const [page, setPage] =useState(1)
  const [status, setStatus] =useState(STATUS.idle)
  const [totalFind, setTotalFind] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  
  const firsRender = useRef(true);


useEffect (()=>{
  const handelFetch = async serchValue => {
    try {
      if(searchQuery ===''){
        return
      }
      setStatus(STATUS.pending);
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&per_page=12&page=${page}&q=${serchValue}&image_type=photo&pretty=true`
      );
      if (data.hits.length === 0) {
              setStatus(STATUS.rejected);
              Notiflix.Notify.failure('No images');
              return;
            }

      setStatus(STATUS.success);
      setImgData(prevState => [...prevState, ...data.hits]);
      setTotalFind(prevState => prevState + data.hits.length);
      setTotalHits(data.totalHits);
    } catch (error) {
      setStatus(STATUS.rejected);
      Notiflix.Notify.failure('No images');
    } 
  };
  if (!firsRender.current) {
    handelFetch(searchQuery);
    return;
  }

  firsRender.current = false;
},[searchQuery, page])


  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };


  const onSubmit = value => {
    setSearchQuery(value);
    setPage(1);
    setImgData([]);
    setTotalFind(0);
    console.log(searchQuery)
}


  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit}/>

      <ImageGallery imgData= {imgData}/>

      {status === STATUS.pending && <Loader />}

      {status === STATUS.success && imgData.length > 0 && totalFind !== totalHits &&
            (<Button onClick={loadMore} />
          )}

      <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
       
    </div>
  )
}  
  


 





  








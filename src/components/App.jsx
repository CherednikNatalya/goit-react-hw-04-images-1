import { useState, useEffect, useRef } from "react";
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
// import { fetchPichureData } from '../services/service';
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
const BASE_URL = 'https://pixabay.com/api'

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
    <>
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
    </>
  )
}  
  


 





  








  // import { Component } from "react";
  // import {Searchbar} from './Searchbar/Searchbar'
  // import {ImageGallery} from './ImageGallery/ImageGallery'
  // import { Button } from './Button/Button';
  // import { Loader } from './Loader/Loader';
  // import { fetchPichureData } from '../services/service';
  // import { ToastContainer } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';
  // import Notiflix from 'notiflix';
  
  
  // const STATUS = {
  //   idle: 'idle',
  //   pending: 'pending',
  //   success: 'success',
  //   rejected: 'rejected',
  // };
  
  
  // export  class App extends Component {
  //   state = {
  //     searchQuery: '',
  //     imgData: [],
  //     page: 1,
  //     status: STATUS.idle,
  //   }
  
  
  
  //   componentDidUpdate(_, prevState) {
  
  //     const { searchQuery, page } = this.state;
  //     const { page: prevPage, searchQuery: prevQuery } = prevState;
  
  //     if (searchQuery !== prevQuery || page !== prevPage) {
  //       this.fetchData();
  //     }
  //   }
  
  //   fetchData = async () => {
  //     this.setState({ status: STATUS.pending });
  //     const { searchQuery, page } = this.state;
      
  //     try {
  //       const requestData = await fetchPichureData(searchQuery, page);
  //       if (requestData.data.total === 0) {
  //         this.setState({
  //           status: STATUS.rejected,
  //         });
  //         Notiflix.Notify.failure('No images');
  //         return;
  //       }
  //       this.setState(({ imgData: prevData }) => ({
  //         imgData: [...prevData, ...requestData.data.hits],
  //         status: STATUS.success,
  //       }));
  //     } catch (error) {
  //       this.setState({
  //         status: STATUS.rejected,
  //       });
  //       Notiflix.Notify.failure('No images');
  //     }
  //   };
  
  
  //   loadMore = () => {
  //     this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }));
  //   };
  
  
  // onSubmit = searchQuery => {
  // this.setState ({
  //   searchQuery,
  //   imgData: [],
  //   page: 1,})
  // }
  
  // render () {
  // const {imgData, status} = this.state;
  
  
  //   return (
  //     <>
  //       <Searchbar onSubmit={this.onSubmit}/>
  //       <ImageGallery imgData= {imgData}/>
  
  //       {status === STATUS.pending && <Loader />}
  
  //       {status === STATUS.success && !(imgData.length < 12)&&
  //             (<Button onClick={this.loadMore} />
  //           )}
  
  //       <ToastContainer
  //           position="top-right"
  //           autoClose={1500}
  //           hideProgressBar={false}
  //           newestOnTop={false}
  //           closeOnClick
  //           rtl={false}
  //           pauseOnFocusLoss
  //           draggable
  //           pauseOnHover
  //           theme="colored"
  //         />
  //     </>
  //   )
  // }  
  //   }
  


  


  // import { useMemo, useEffect, useState } from 'react';

  // import debounce from 'lodash/debounce';
  
  // import { STATUS } from '../../constants/status.constants';
  // import { getPosts } from '../../services/posts.service';
  // import { NotFound } from '../NotFound/NotFound';
  
  // import { PostsItem } from './components/PostsItem';
  // import { PostsLoader } from './components/PostsLoader';
  
  // export const Posts = () => {
  //   const [posts, setPosts] = useState(null);
  //   const [status, setStatus] = useState(STATUS.idle);
  //   const [search, setSearch] = useState('');
  
  //   const fetchData = async ({ page = 1, query = '' }) => {
  //     setStatus(STATUS.loading);
  //     try {
  //       const data = await getPosts({ page, search: query });
  //       setPosts(data);
  //       setStatus(STATUS.success);
  //     } catch (error) {
  //       console.log(error);
  //       setStatus(STATUS.error);
  //     }
  //   };
  
  //   // const searchPosts = useCallback(
  //   //   debounce(query => fetchData({ query }), 500),
  //   //   [],
  //   // );
  
  //   const searchPosts = useMemo(() => {
  //     return debounce(query => fetchData({ query }), 500);
  //   }, []);
  
  //   const handleSearch = event => {
  //     setSearch(event.target.value);
  //     searchPosts(event.target.value);
  //   };
  
  //   useEffect(() => {
  //     fetchData({ page: 1 });
  //   }, []);
  
  //   return (
  //     <>
  //       <input
  //         type="text"
  //         className="form-control mb-4"
  //         placeholder="Type to search..."
  //         value={search}
  //         onChange={handleSearch}
  //       />
  
  //       {(status === STATUS.loading || status === STATUS.idle) && <PostsLoader />}
  
  //       {status === STATUS.error && <NotFound />}
  
  //       <div className="container-fluid g-0 pb-5 mb-5">
  //         <div className="row">
  //           {posts?.data.map(post => (
  //             <PostsItem key={post.id} post={post} />
  //           ))}
  //         </div>
  //       </div>
  
  //       {posts?.total_pages && (
  //         <div className="pagination">
  //           <div className="btn-group my-2 mx-auto btn-group-lg">
  //             {[...Array(posts.total_pages)].map((_, index) => {
  //               const page = index + 1;
  
  //               return (
  //                 <button
  //                   key={index}
  //                   type="button"
  //                   disabled={page === posts.page}
  //                   className="btn btn-primary"
  //                   onClick={() => {
  //                     if (page !== posts.page) {
  //                       fetchData({ page, query: search });
  //                     }
  //                   }}
  //                 >
  //                   {page}
  //                 </button>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };
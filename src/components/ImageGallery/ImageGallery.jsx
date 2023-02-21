import css from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Section } from '../Section/Section';

export const ImageGallery =({imgData}) => {
 
    return (
      <Section className="gallery">
        <>
          <ul className={css.container}>
            {imgData.map(({ webformatURL, id, tags, largeImageURL }) => (
              <ImageGalleryItem 
              smallImage={webformatURL}
              // key={webformatURL}
              altPhotos={tags}
              lagImage={largeImageURL} />
            ))}
          </ul>
        </>
      </Section>
    );
  }






// import css from './ImageGallery.module.css';

// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from '../Loader/Loader';

// import { Section } from 'components/Section/Section';
// import { Button } from 'components/Button/Button';
// import { Component } from 'react';
// import { fetchPichureData } from '../../services/service';


// import Notiflix from 'notiflix';

// const STATUS = {
//   idle: 'idle',
//   pending: 'pending',
//   success: 'success',
//   rejected: 'rejected',
// };

// export class ImageGallery extends Component {
//   state = {
//     imgData: [],
//     page: 1,
//     per_page: 12,
//     status: STATUS.idle,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery } = this.props;
//     const { searchQuery: prevQuery } = prevProps;
//     const { page } = this.state;
//     const { page: prevPage } = prevState;

//     if (searchQuery !== prevQuery) {
//       this.setState({ page: 1, imgData: []});
//     }
//     if (searchQuery !== prevQuery || page !== prevPage) {
//       this.setState({ page: 1, imgData: []});
//       this.fetchData();
//     }
//   }

//   fetchData = async () => {
//     this.setState({ status: STATUS.pending });
//     const { searchQuery } = this.props;
//     const { page, per_page } = this.state;
//     try {
//       const requestData = await fetchPichureData(searchQuery, page, per_page);
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

//   render() {
//     const { status, imgData,per_page } = this.state;

//     return (
//       <Section className="gallery">
//         <>
//           <ul className={css.container}>
//             {imgData.map(imgItem => (
//               <ImageGalleryItem key={imgItem.id} {...imgItem} />
//             ))}
//           </ul>
//           {status === STATUS.pending && <Loader />}
//           {status === STATUS.success && !(imgData.length<per_page)&&
//             (<Button onClick={this.loadMore} />
//           )}
//         </>
//       </Section>
//     );
//   }
// }







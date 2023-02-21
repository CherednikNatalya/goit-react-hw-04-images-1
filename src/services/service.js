import axios from "axios";
const baseURL = 'https://pixabay.com/api'
 

  export const fetchPichureData = (searchQuery, page = 1, per_page = 12) => {
    return axios.get(baseURL, {
      params: {
        key: '31541189-0a437f1c4a0bdb60103b05fd6',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        q: searchQuery,
        per_page,
      },
    });
  };
  
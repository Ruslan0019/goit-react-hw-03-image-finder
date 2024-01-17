import axios from 'axios';

const API_KEY = '40489521-2d233b9ce133180f8f85686cd';
const BASE_URL = 'https://pixabay.com/api/';

const fetchData = async (query, pageNumber) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        page: pageNumber,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12
      }
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.hits;
  } catch (error) {
    console.error('Error while receiving data:', error);
    throw error;
  }
};

export default fetchData;

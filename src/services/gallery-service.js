import axios from 'axios';

export const getGalleryService = async (name, page) => {
  const data = await axios.get(
    `https://pixabay.com/api/?q=${name}&key=30757055-8f8e35a6024963473ffe3e1a3&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ); // params => {search: 'cat', page: 2}
  return data;
};

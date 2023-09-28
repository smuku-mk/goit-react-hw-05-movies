import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '209961ac45b6dc915dd13d12f4a2e63f';

export const fetchTrending = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchDetails = async ({ movieId }) => {
  const details = await axios.get(`movie/${movieId}?api_key=${API_KEY}`);
  return details.data;
};

export const fetchCast = async ({ movieId }) => {
  const cast = await axios.get(`movie/${movieId}/credits?api_key=${API_KEY}`);
  return cast.data.cast;
};

export const fetchReviews = async ({ movieId }) => {
  const reviews = await axios.get(`movie/${movieId}/reviews?api_key=${API_KEY}`);
  return reviews.data.results;
};

export const fetchSearch = async ({ query }) => {
  const response = await axios.get(`search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};

fetchDetails.propTypes = {
  movieId: PropTypes.number.isRequired,
};

fetchSearch.propTypes = {
  query: PropTypes.string.isRequired,
};

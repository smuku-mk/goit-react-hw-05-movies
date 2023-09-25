import { useEffect, useState } from 'react';
import { fetchTrending } from 'services';
import { List } from './Home.styled';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await fetchTrending();
      setTrending(response);
    };
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <List>
        {trending.map(trend => (
          <li key={trend.id}>
            <Link to={`/movies/${trend.id}`}>{trend.title}</Link>
          </li>
        ))}
      </List>
    </>
  );
};

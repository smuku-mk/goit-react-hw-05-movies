import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import { fetchSearch } from 'services';
import { List } from './Movies.styled';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useUpdateEffect(() => {
    const fetch = async () => {
      const response = await fetchSearch({ query: query });
      if (response.length) {
        setMovies(response);
        setLoading(true);
      } else {
        setLoading(true);
        alert(`There is no movie "${query}". Type another movie title.`);
        searchParams.delete('query');
        setSearchParams(searchParams);
      }
    };
    if (query.length) {
      fetch();
    }
  }, [query]);

  useEffect(() => {
    if (query.length) {
      const fetch = async () => {
        const response = await fetchSearch({ query: query });
        setMovies(response);
        setLoading(true);
      };
      fetch();
    }
  });

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const { search } = form.elements;
    if (search.value) {
      setSearchParams({ query: search.value });
      setLoading(false);
    } else {
      alert(`There is no movie without a title. Type something`);
    }

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="search" type="text" autoComplete="off" autoFocus placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <List>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </List>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

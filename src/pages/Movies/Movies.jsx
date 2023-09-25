import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchSearch } from 'services';
import { List } from './Movies.styled';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchSearch({ query: query });
      setMovies(response);
    };
    fetch();
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const { search } = form.elements;
    setSearchParams({ query: search.value });

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="search" type="text" autoComplete="off" autoFocus placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
      <List>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </List>
    </>
  );
};

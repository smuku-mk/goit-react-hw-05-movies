import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services';
import { Btn, Container } from './MovieDetails.styled';
import { AdditionalInfo } from '../../components/AdditionalInfo';

export const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMovieDetails({ movieId: movieId });
      setMovie(response.details);
    };
    fetch();
  }, [movieId]);

  const { poster_path, title, release_date, vote_average, overview, genres } = movie;
  const year = new Date(release_date).getFullYear();
  const score = Math.round(vote_average * 10);

  return (
    <div>
      <Link to={backLinkHref}>
        <Btn>GO BACK</Btn>
      </Link>
      <Container>
        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title}></img>
        <div>
          <h2>
            <b>
              {title} ({year})
            </b>
          </h2>
          <span>{`User Score: ${score}%`}</span>
          <h3>
            <b>Overview</b>
          </h3>
          <p>{overview}</p>
          <h3>
            <b>Genres</b>
          </h3>
          {genres ? (
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          ) : (
            'No genres available'
          )}
        </div>
      </Container>
      <AdditionalInfo />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from 'services';
import { Container } from './MovieInfo.styled';
import noPoster from '../../images/default-movie.jpg';

export const MovieInfo = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setLoading(false);
      const response = await fetchDetails({ movieId: movieId });
      setMovie(response);
      setLoading(true);
    };
    fetch();
  }, [movieId]);

  const { poster_path, title, release_date, vote_average, overview, genres } = movie;
  const year = new Date(release_date).getFullYear();
  const score = Math.round(vote_average * 10);

  if (loading) {
    return (
      <Container>
        {poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title}></img>
        ) : (
          <img src={`${noPoster}`} alt="No poster available" width="200"></img>
        )}
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
    );
  } else {
    return <div>Loading...</div>;
  }
};

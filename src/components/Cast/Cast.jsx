import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services';
import { Item, List } from './Cast.styled';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMovieDetails({ movieId: movieId });
      setCast(response.cast);
    };
    fetch();
  }, [movieId]);

  return (
    <List>
      {cast.map(e => (
        <Item key={e.id}>
          <img src={`https://image.tmdb.org/t/p/w200${e.profile_path}`} alt={e.name} width="100px"></img>
          <div>
            <p>{e.name}</p>
            <p>Character: {e.character}</p>
          </div>
        </Item>
      ))}
    </List>
  );
};

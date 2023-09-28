import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services';
import { Item, List } from './Cast.styled';
import poster from '../../images/default-cast.jpg';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchCast({ movieId: movieId });
      setCast(response);
    };
    fetch();
  }, [movieId]);

  return (
    <List>
      {cast.map(e => (
        <Item key={e.id}>
          {e.profile_path ? (
            <img src={`https://image.tmdb.org/t/p/w200${e.profile_path}`} alt={e.name} width="100px"></img>
          ) : (
            <img src={poster} alt="No poster available" width="100px"></img>
          )}
          <div>
            <p>{e.name}</p>
            <p>Character: {e.character}</p>
          </div>
        </Item>
      ))}
    </List>
  );
};

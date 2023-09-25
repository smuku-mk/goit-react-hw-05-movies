import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services';
import { Item, List } from './Reviews.styled';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMovieDetails({ movieId: movieId });
      setReviews(response.reviews);
    };
    fetch();
  }, [movieId]);

  return (
    <>
      {reviews > 0 ? <List>
        {reviews.map(review => (
          <Item>
            <span>
              <b>Author: {review.author}</b>
            </span>
            <p>{review.content}</p>
          </Item>
        ))}
      </List> : "We don't have any reviews for this movie."}
    </>
  );
};

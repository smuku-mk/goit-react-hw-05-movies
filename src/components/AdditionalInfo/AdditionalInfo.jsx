import { Link } from 'react-router-dom';
import { Container } from './AdditionalInfo.styled';

export const AdditionalInfo = () => {
  return (
    <Container>
      <span>Additional information</span>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
    </Container>
  );
};

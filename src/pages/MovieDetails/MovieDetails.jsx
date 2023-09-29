import { Suspense, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Btn } from './MovieDetails.styled';
import { AdditionalInfo, MovieInfo } from 'components';
import { useMount } from 'react-use';

export const MovieDetails = () => {
  const [backLink, setBackLink] = useState('');
  const location = useLocation();

  useMount(() => {
    setBackLink(location.state?.from.pathname + location.state?.from.search || '/');
  });

  return (
    <div>
      <Link to={backLink}>
        <Btn>GO BACK</Btn>
      </Link>
      <MovieInfo />
      <AdditionalInfo />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

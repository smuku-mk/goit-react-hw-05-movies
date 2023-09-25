import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from './SharedLayout';

const Home = lazy(() => import('pages').then(module => ({ default: module.Home })));
const Movies = lazy(() => import('pages').then(module => ({ default: module.Movies })));
const NotFound = lazy(() => import('pages').then(module => ({ default: module.NotFound })));
const MovieDetails = lazy(() => import('pages').then(module => ({ default: module.MovieDetails })));
const Reviews = lazy(() => import('./Reviews').then(module => ({ default: module.Reviews })));
const Cast = lazy(() => import('./Cast').then(module => ({ default: module.Cast })));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

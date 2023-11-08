import '@/styles/globals.scss';
import { Suspense } from 'react';
import Hero from '@/components/pages/homepage/hero/Hero';
import MoviesDisplay from '@/components/pages/homepage/movies_display/MoviesDisplay';
import { getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/requests/movies';
import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';
import requests from '@/lib/requests/movies';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import Skeleton from 'react-loading-skeleton';
import Loading from './loading';

export const dynamic = 'force-dynamic';

const Home = async () => {
 
  // const fetchMoviesWithTimeout = async (time: number) => {
  //   const movies = await getNowPlayingMovies();
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(movies);
  //     }, time);
  //   });
  // };
  // const nowPlayingMovies = await fetchMoviesWithTimeout(6000);
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  // const sortedByVoteTopRatedMovies = sortMoviesByVote(await getTopRatedMovies());
  return (
    <div>
      <Hero />
      {/* //Search */}
      <MoviesDisplay headerTitle="In Theatres" endpoint="now_playing" movies={nowPlayingMovies} />
      {/* <MoviesDisplay movies={upcomingMovies} headerTitle="Upcoming" endpoint="upcoming" /> */}
      {/* <MoviesDisplay movies={sortedByVoteTopRatedMovies} headerTitle="Top Rated" endpoint="top_rated" /> */}
    </div>
  );
};

export default Home;

import '@/styles/globals.scss';
import Hero from '@/components/homepage/hero/Hero';
import MoviesDisplay from '@/components/homepage/movies_display/MoviesDisplay';
import { getNowPlayingMovies, getTopRatedMovies } from '@/lib/requests/movies';
import { getUpcomingMovies } from '@/lib/requests/movies';

const Home = async () => {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  console.log(nowPlayingMovies);
  return (
    <div>
      <Hero />
      <MoviesDisplay movies={nowPlayingMovies} headerTitle="In Theatres" />
      <MoviesDisplay movies={upcomingMovies} headerTitle="Upcoming" />
      <MoviesDisplay movies={topRatedMovies} headerTitle="Top Rated" />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  );
};

export default Home;

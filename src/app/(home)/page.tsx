import '@/styles/globals.scss';
import Hero from '@/components/homepage/hero/Hero';
import MoviesDisplay from '@/components/homepage/movies_display/MoviesDisplay';
import { getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/requests/movies';
import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';

const Home = async () => {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const sortedByVoteTopRatedMovies = sortMoviesByVote(await getTopRatedMovies());
console.log(sortedByVoteTopRatedMovies)
  return (
    <div>
      <Hero />
      <MoviesDisplay movies={nowPlayingMovies} headerTitle="In Theatres" endpoint="now_playing" />
      <MoviesDisplay movies={upcomingMovies} headerTitle="Upcoming" endpoint="upcoming" />
      <MoviesDisplay movies={sortedByVoteTopRatedMovies} headerTitle="Top Rated" endpoint="top_rated" />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  );
};

export default Home;

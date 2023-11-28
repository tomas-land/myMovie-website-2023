import '@/styles/globals.scss';
import Hero from '@/components/pages/homepage/hero/Hero';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/requests/movies';
import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';
import Slider from '@/components/pages/homepage/slider/Slider';

export const dynamic = 'force-dynamic';


const Home = async () => {

  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const sortedByVoteTopRatedMovies = sortMoviesByVote(await getTopRatedMovies());
  return (
    <div>
      <Hero />
      <ContentDisplay headerTitle="In Theatres" >
        <Slider movies={nowPlayingMovies} endpoint='now_playing' />
      </ContentDisplay>
      <ContentDisplay headerTitle="Upcoming">
        <Slider movies={upcomingMovies} endpoint='upcoming' />
      </ContentDisplay>
      <ContentDisplay headerTitle="Top Rated">
        <Slider movies={sortedByVoteTopRatedMovies} endpoint='top_rated' />
      </ContentDisplay>
    </div>
  );
};

export default Home;

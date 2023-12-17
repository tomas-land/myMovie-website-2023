import '@/styles/globals.scss';
import Hero from '@/components/pages/homepage/hero/Hero';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/requests/movies';
import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';
import Slider from '@/components/pages/homepage/slider/Slider';
import s from '@/components/pages/homepage/homepage.module.scss'


const Home = async () => {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  // const sortedByVoteTopRatedMovies = sortMoviesByVote(await getTopRatedMovies());

  return (
    <div className={s.homepage}>
      <Hero />
      <div className={s.content_displays_wrapper}>
        <ContentDisplay headerTitle="In Theatres" >
          <Slider movies={nowPlayingMovies} endpoint='now_playing' />
        </ContentDisplay>
        <ContentDisplay headerTitle="Upcoming">
          <Slider movies={upcomingMovies} endpoint='upcoming' />
        </ContentDisplay>
        {/* <ContentDisplay headerTitle="Top Rated">
        <Slider movies={sortedByVoteTopRatedMovies} endpoint='top_rated' />
      </ContentDisplay> */}
      </div>
    </div>
  );
};

export default Home;

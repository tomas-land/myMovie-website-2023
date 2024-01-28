import '@/styles/globals.scss';
import s from '@/components/pages/homepage/homepage.module.scss'
import Hero from '@/components/pages/homepage/hero/Hero';
import MediaDisplay from '@/components/shared/media_display/MediaDisplay';
import { getLatestMovies, getUpcomingMovies, getTopRatedMovies } from '@/lib/requests/movies';
import { getLatestTvSeries, getUpcomingTvSeries } from '@/lib/requests/tv_series';
// import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';
import getBlurredEntitiesUrl from '@/lib/helpers/getBlurredEntitiesUrl';


const Home = async () => {
  const latestMovies = await getBlurredEntitiesUrl(await getLatestMovies()); // getBlurredEntitiesUrl() is used to get the blurred backdrop image url for next image placeholder
  const latestTvSeries = await getLatestTvSeries();
  const upcomingMovies = await getUpcomingMovies();
  const upcomingTvSeries = await getUpcomingTvSeries();
  // const sortedByVoteTopRatedMovies = sortMoviesByVote(await getTopRatedMovies());

  return (
    <div className={s.homepage}>
      <Hero />
      <div className={s.content_displays_wrapper}>
        <MediaDisplay headerTitle="Latest" movies={latestMovies} tvSeries={latestTvSeries} endpoint='latest' isQuickView={true} />
        <MediaDisplay headerTitle="Upcoming" movies={upcomingMovies} tvSeries={upcomingTvSeries} endpoint='upcoming' isQuickView={true} />
        {/* <ContentDisplay headerTitle="Top Rated" movies={sortedByVoteTopRatedMovies} tvSeries={latestTvSeries} endpoint='top_rated' /> */}
      </div>
    </div>
  );
};

export default Home;

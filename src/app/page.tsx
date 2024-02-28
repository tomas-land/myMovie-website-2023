import '@/styles/globals.scss';
import s from '@/components/pages/homepage/homepage.module.scss'
import Hero from '@/components/pages/homepage/hero/Hero';
import MediaDisplay from '@/components/shared/media_display/MediaDisplay';
import { getLatestMovies, getUpcomingMovies, getTopRatedMovies } from '@/lib/requests/movies';
import { getLatestTvSeries, getTopRatedTvSeries, getUpcomingTvSeries } from '@/lib/requests/tv_series';
import { sortMoviesByVote } from '@/lib/helpers/movies/sortMoviesByVote';
import getBlurredEntitiesUrl from '@/lib/helpers/getBlurredEntitiesUrl';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';


const Home = async () => {
  const latestMovies:iMovie[] = await getBlurredEntitiesUrl(await getLatestMovies(1)); // getBlurredEntitiesUrl() is used to get the blurred backdrop image url for next image placeholder
  const latestTvSeries:iTvSeries[] = await getLatestTvSeries(1);
  const upcomingMovies:iMovie[] = await getUpcomingMovies();
  const upcomingTvSeries:iTvSeries[] = await getUpcomingTvSeries();
  const sortedByVoteTopRatedMovies: iMovie[] = sortMoviesByVote(await getTopRatedMovies()) as iMovie[];
  const sortedByVoteTopRatedTvSeries: iTvSeries[] = sortMoviesByVote(await getTopRatedTvSeries()) as iTvSeries[];

  return (
    <div className={s.homepage}>
      <Hero />
      <div className={s.content_displays_wrapper}>
        <MediaDisplay headerTitle="Latest" movies={latestMovies} tvSeries={latestTvSeries} endpoint='latest' isQuickView={true} cardWidth='16rem' />
        <MediaDisplay headerTitle="Upcoming" movies={upcomingMovies} tvSeries={upcomingTvSeries} endpoint='upcoming' isQuickView={true} cardWidth='16rem' />
        <MediaDisplay headerTitle="Top Rated" movies={sortedByVoteTopRatedMovies} tvSeries={sortedByVoteTopRatedTvSeries} endpoint='top_rated' isQuickView={true} cardWidth='16rem' />
      </div>
    </div>
  );
};

export default Home;

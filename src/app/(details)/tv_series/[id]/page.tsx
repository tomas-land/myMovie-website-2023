import BackdropImage from '@/components/shared/backdrop_image/BackdropImage';
import MovieDetails from '@/components/pages/movie_details_page/movie_details/MovieDetails';
import { getTvSeriesById } from '@/lib/requests/tv_series';

interface iProps {
  params: {
    id: string;
  };
}

const TvSeriesPage = async ({ params }: iProps) => {
  const { id } = params;
  const tvSeries = await getTvSeriesById(id);
  // const movie = await getMovieById(id);
  // const movieImages = await getMovieImagesById(id);
  // const movieVideos = await getMovieVideosById(id);
  return (
    <div>
      {/* <BackdropImage movie={movie} />
      <MovieDetails movie={movie} movieImages={movieImages} movieVideos={movieVideos} /> */}
      {tvSeries.name}
    </div>
  );
};

export default TvSeriesPage;

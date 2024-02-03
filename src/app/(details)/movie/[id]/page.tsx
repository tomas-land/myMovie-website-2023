import BackdropImage from '@/components/shared/backdrop_image/BackdropImage';
import MovieDetails from '@/components/pages/details/movie/movie_details/MovieDetails';
import { getMovieById, getMovieImagesById, getMovieVideosById } from '@/lib/requests/movies';
import ScenesGrid from '@/components/pages/details/movie/scenes_grid/ScenesGrid';

interface iProps {
  params: {
    id: string;
  };
}

const MoviePage = async ({ params }: iProps) => {
  const { id } = params;
  const movie = await getMovieById(id);
  const movieImages = await getMovieImagesById(id);
  const movieVideos = await getMovieVideosById(id);

  return (
    <div>
      <BackdropImage movie={movie} />
      <MovieDetails movie={movie} movieVideos={movieVideos} />
      <ScenesGrid movieImages={movieImages} movie={movie} />
    </div>
  );
};

export default MoviePage;

import BackdropImage from '@/components/movie_details_page/backdrop_image/BackdropImage';
import MovieDetails from '@/components/movie_details_page/movie_details/MovieDetails';
import { getMovieById, getMovieImagesById, getMovieVideosById } from '@/lib/requests/movies';

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
      <MovieDetails movie={movie} movieImages={movieImages} movieVideos={movieVideos} />
    </div>
  );
};

export default MoviePage;

import BackdropImage from '@/components/movie_details_page/backdrop_image/BackdropImage';
import MovieDetails from '@/components/movie_details_page/movie_details/MovieDetails';
import { getMovieById,getMovieImagesById } from '@/lib/requests/movies';

interface iProps {
  params: {
    id: string;
  };
}

const MoviePage = async ({ params }: iProps) => {
  const { id } = params;
  const movie = await getMovieById(id);
  const movieImages = await getMovieImagesById(id);
  console.log(movieImages);
  return (
    <div>
      <BackdropImage movie={movie} />
      <MovieDetails movie={movie} movieImages={movieImages} />
      {/* <TrailerModal />     */}
    </div>
  );
};

export default MoviePage;

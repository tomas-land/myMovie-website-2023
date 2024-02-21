import { getLatestMovies, getMovieGenres } from '@/lib/requests/movies';
import MoviesList from '@/components/shared/media_list/movies/MoviesList';
import { iMovie } from '@/lib/interfaces/movie';
import { iMovieGenre } from '@/lib/interfaces/movie';
import GenreTags from '@/components/shared/genre_tags/GenreTags';


const MoviesPage = async () => {

    const latestMovies: iMovie[] = await getLatestMovies(); // getBlurredEntitiesUrl() is used to get the blurred backdrop image url for next image placeholder
    const movieGenres: iMovieGenre[] = await getMovieGenres();

    return (
        <div style={{ minHeight: '100vh' }}>
            <GenreTags genres={movieGenres} />
            {/* //Aside-filter */}
            {/* // Search bar */}
            <MoviesList movies={latestMovies} headerTitle='Latest Movies' />
        </div>
    );
}

export default MoviesPage;

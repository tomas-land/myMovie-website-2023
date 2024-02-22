import { getLatestMovies, getMovieGenres } from '@/lib/requests/movies';
import MoviesList from '@/components/shared/media_list/movies/MoviesList';
import { iMovie } from '@/lib/interfaces/movie';
import { iMovieGenre } from '@/lib/interfaces/movie';
import GenreTags from '@/components/shared/genre_tags/GenreTags';
import SearchBar from '@/components/shared/search_page/SearchBar';


const MoviesPage = async ({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) => {

    const latestMovies: iMovie[] = await getLatestMovies(); // getBlurredEntitiesUrl() is used to get the blurred backdrop image url for next image placeholder
    const movieGenres: iMovieGenre[] = await getMovieGenres();
    const query = searchParams?.query || '';
    return (
        <div style={{ minHeight: '100vh' }}>
            <GenreTags genres={movieGenres} />
            {/* //Aside-filter */}
            <SearchBar />
            <MoviesList movies={latestMovies} headerTitle='Latest Movies' query={query}/>
        </div>
    );
}

export default MoviesPage;

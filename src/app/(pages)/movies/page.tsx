import { getLatestMovies, getMovieGenres } from '@/lib/requests/movies';
import { iMovie } from '@/lib/interfaces/movie';
import { iGenre } from '@/lib/interfaces/movie';
import GenreTags from '@/components/shared/genre_tags/GenreTags';
import SearchBar from '@/components/shared/search_page/SearchBar';
import LatestMovies from '@/components/pages/movies/LatestMovies';
export const revalidate = 60;


const MoviesPage = async ({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) => {

    const latestMovies: iMovie[] = await getLatestMovies(3);
    const movieGenres: iGenre[] = await getMovieGenres();
    const query = searchParams?.query || ''; // Get query from searchParams if it exists or set it to an empty string
    
    return (
        <div style={{ minHeight: '100vh' }}>
            <GenreTags genres={movieGenres} />
            <SearchBar />
            <LatestMovies movies={latestMovies} headerTitle='Latest movies' query={query}/>
        </div>
    );
}

export default MoviesPage;

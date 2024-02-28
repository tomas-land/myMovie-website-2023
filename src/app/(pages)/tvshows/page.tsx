import { getLatestTvSeries, getTvSeriesGenres } from '@/lib/requests/tv_series';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iGenre } from '@/lib/interfaces/tv_series';
import GenreTags from '@/components/shared/genre_tags/GenreTags';
import SearchBar from '@/components/shared/search_page/SearchBar';
import LatestTvSeries from '@/components/pages/tv_series/LatestTvSeries';
export const revalidate = 60;


const MoviesPage = async ({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) => {

    const latestTvSeries: iTvSeries[] = await getLatestTvSeries(3);
    const tvSeriesGenres: iGenre[] = await getTvSeriesGenres();
    const query = searchParams?.query || ''; // Get query from searchParams if it exists or set it to an empty string
    
    return (
        <div>
            <GenreTags genres={tvSeriesGenres} />
            <SearchBar />
            <LatestTvSeries tvSeries={latestTvSeries} headerTitle='Latest Tv-series' query={query}/>
        </div>
    );
}

export default MoviesPage;

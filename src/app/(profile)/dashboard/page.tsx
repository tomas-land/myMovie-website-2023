
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import MediaDisplay from '@/components/shared/media_display/MediaDisplay';
import { getRecentFavoriteMovies, getRecentFavoriteTvSeries, getUpcomingMoviesFromWatchlist, getUpcomingTvSeriesFromWatchlist } from '@/lib/requests/user';
import { iFavorite } from '@/lib/interfaces/favorite';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';


const Dashboard = async () => {
    const recentFavoriteMovies: iFavorite[] = await getRecentFavoriteMovies()
    const recentFavoriteTvSeries: iFavorite[] = await getRecentFavoriteTvSeries()
    const upcomingMoviesFromWatchlist:iWatchlistItem[] = await getUpcomingMoviesFromWatchlist()
    const upcomingTvSeriesFromWatchlist:iWatchlistItem[] = await getUpcomingTvSeriesFromWatchlist()

    return (
        <div>
            <Stats />
            <MediaDisplay headerTitle='Recent favorite' movies={recentFavoriteMovies} tvSeries={recentFavoriteTvSeries} userProfile={true} isQuickView={false} cardWidth='16rem'/>
            <MediaDisplay headerTitle='Upcoming from watchlist' movies={upcomingMoviesFromWatchlist} tvSeries={upcomingTvSeriesFromWatchlist} userProfile={true} isQuickView={false} cardWidth='16rem'/>
        </div>
    );
};

export default Dashboard;

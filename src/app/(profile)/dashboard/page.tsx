
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import MediaDisplay from '@/components/shared/media_display/MediaDisplay';
import { getRecentFavoriteMovies, getRecentFavoriteTvSeries } from '@/lib/requests/user';
import { iFavorite } from '@/lib/interfaces/favorite';


const Dashboard = async () => {
    const recentFavoriteMovies: iFavorite[] = await getRecentFavoriteMovies()
    const recentFavoriteTvSeries: iFavorite[] = await getRecentFavoriteTvSeries()
    return (
        <div>
            <Stats />
            <MediaDisplay headerTitle='Recent favorite' movies={recentFavoriteMovies} tvSeries={recentFavoriteTvSeries} userProfile={true} isQuickView={false} cardWidth='16rem'/>
        </div>
    );
};

export default Dashboard;

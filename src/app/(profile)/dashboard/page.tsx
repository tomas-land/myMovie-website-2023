
import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getRecentFavoriteMovies } from '@/lib/requests/user';
// import { getRecentFavoriteTvSeries } from '@/lib/requests/user';
import { iMovie } from '@/lib/interfaces/movie';
// import { iTvSeries } from '@/lib/interfaces/tv_series';


const Dashboard = async () => {
    const recentFavoriteMovies: iMovie[] = await getRecentFavoriteMovies()
    // const recentFavoriteTvSeries:iTvSeries[] = await getRecentFavoriteTvSeries()

    return (
        <div className={s.dashboard}>
            <Stats />
            
            {/* <ContentDisplay headerTitle='Recent favorite' movies={recentFavoriteMovies} tvSeries={recentFavoriteMovies} profile={true} redirectTo='favorites/movies'/> */}
        </div>
    );
};

export default Dashboard;


import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getRecentFavoriteMovies, getRecentFavoriteTvSeries } from '@/lib/requests/user';
// import { iMovie } from '@/lib/interfaces/movie';
// import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iFavorite } from '@/lib/interfaces/favorite';


const Dashboard = async () => {
    const recentFavoriteMovies: iFavorite[] = await getRecentFavoriteMovies()
    console.log(recentFavoriteMovies)
    const recentFavoriteTvSeries: iFavorite[] = await getRecentFavoriteTvSeries()
    console.log(recentFavoriteTvSeries)
    return (
        <div className={s.dashboard}>
            <Stats />
            <ContentDisplay headerTitle='Recent favorite' movies={recentFavoriteMovies} tvSeries={recentFavoriteTvSeries} profile={true} redirectTo='favorites/movies' isQuickView={false}/>
        </div>
    );
};

export default Dashboard;

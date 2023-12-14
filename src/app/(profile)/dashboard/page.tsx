
import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getRecentFavoriteMovies } from '@/lib/requests/user';
import { iMovie } from '@/lib/interfaces/movie';
import Slider from '@/components/pages/homepage/slider/Slider';


const Dashboard = async () => {
    const recentFavoriteMovies: iMovie[] = await getRecentFavoriteMovies()

    return (
        <div className={s.dashboard}>
            <Stats />
            <ContentDisplay headerTitle='Recent favorite movies'>
                {recentFavoriteMovies?.length > 0 ?
                    <Slider movies={recentFavoriteMovies} profile={true} redirectTo='favorites/movies' /> :
                    <h1>No recent activities.</h1>}
            </ContentDisplay>
        </div>
    );
};

export default Dashboard;


import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import { getFavoriteMovies } from '@/lib/requests/user';
import { iMovie } from '@/lib/interfaces/movie';
import Slider from '@/components/pages/homepage/slider/Slider';


const Dashboard = async () => {

    const favoriteMovies: iMovie[] = (await getFavoriteMovies()).slice(0, 8);

    return (
        <div className={s.dashboard}>
            <Stats />
            <ContentDisplay headerTitle='Recent favorite movies'>
                <Slider movies={favoriteMovies} profile={true} path='movies' />
            </ContentDisplay>
        </div>
    );
};

export default Dashboard;

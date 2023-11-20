
import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';
import MoviesDisplay from '@/components/shared/movies_display/MoviesDisplay';


const Dashboard = async () => {
      
    return (
        <div className={s.dashboard}>
            <Stats />
            <MoviesDisplay headerTitle='Recently Added to Favorites'>
            </MoviesDisplay>
        </div>
    );
};

export default Dashboard;

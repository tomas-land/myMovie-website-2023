import s from '@/components/pages/profile/dashboard.module.scss'
import Stats from '@/components/pages/profile/dashboard/stats/Stats';


const Dashboard = async () => {


    return (
        <div className={s.dashboard}>
            <Stats />
        </div>
    );
};

export default Dashboard;

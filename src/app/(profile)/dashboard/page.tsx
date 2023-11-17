import s from '@/components/pages/profile/dashboard.module.scss'


const Dashboard = async () => {


    return (
        <div className={s.dashboard}>
            <div className={s.stats}>
                <div className={s.stat}>
                    <h2 className={s.title}>Favorites</h2>
                    <div className={s.total}>520</div>
                </div>
                <div className={s.stat}>
                    <h2 className={s.title}>Watchlist</h2>
                    <div className={s.total}>12</div>
                </div>
                <div className={s.stat}>
                    <h2 className={s.title}>Rated</h2>
                    <div className={s.total}>69</div>
                </div>
                <div className={s.stat}>
                    <h2 className={s.title}>Average score</h2>
                    <div className={s.total}>69</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import s from './stats.module.scss'
import NumberCounter from '@/components/pages/profile/dashboard/number_counter/NumberCounter'
const Stats = () => {
    return (
        <div className={s.stats}>

            <div className={s.stat}>
                <h2 className={s.title}>Favorites</h2>
                <NumberCounter finalValue={65} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Watchlist</h2>
                <NumberCounter finalValue={65} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Rated</h2>
                <NumberCounter finalValue={65} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Average score</h2>
                <NumberCounter finalValue={65} />
            </div>
        </div>
    )
}

export default Stats
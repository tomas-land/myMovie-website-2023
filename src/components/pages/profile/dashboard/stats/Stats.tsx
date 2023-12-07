import { getFavoriteMovies } from '@/lib/requests/user'
import s from './stats.module.scss'
import NumberCounter from '@/components/pages/profile/dashboard/number_counter/NumberCounter'


const Stats = async () => {
    const stats = await getFavoriteMovies()
    const favoritesCount = stats.length
    console.log(stats.length)

    return (
        <div className={s.stats}>

            <div className={s.stat}>
                <h2 className={s.title}>Favorite Movies</h2>
                <NumberCounter finalValue={favoritesCount} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Favorite Actors</h2>
                <NumberCounter finalValue={65} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Watchlist</h2>
                <NumberCounter finalValue={12} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Rated</h2>
                <NumberCounter finalValue={55} />
            </div>
            <div className={s.stat}>
                <h2 className={s.title}>Average score</h2>
                <NumberCounter finalValue={68} />
            </div>
        </div>
    )
}

export default Stats
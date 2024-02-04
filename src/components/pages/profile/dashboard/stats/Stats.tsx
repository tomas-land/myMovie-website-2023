import { getFavoriteMovies, getFavoriteTvSeries, getRatedTotal } from '@/lib/requests/user'
import s from './stats.module.scss'
import NumberCounter from '@/components/pages/profile/dashboard/number_counter/NumberCounter'

const StatCard = ({ title, count }: { title: string, count: number }) => {
    return (
        <div className={s.stat_card}>
            <h2 className={s.title}>{title}</h2>
            <NumberCounter count={count === 0 ? 99 : count} /> {/* // if no count, set to 99 to show animation of number counter ( for testing purpose) */}
        </div>
    )
}

const Stats = async () => {
    const favoriteMoviesCount = (await getFavoriteMovies()).length
    const favoriteTvSeriesCount = (await getFavoriteTvSeries()).length
    const favoriteActorsCount = 99
    const watchlistCount = 99
    const ratedCount = ((await getRatedTotal()).length)
    const averageScore = 99

    return (
        <div className={s.stats_container}>
            <StatCard title="Favorite Movies" count={favoriteMoviesCount} />
            <StatCard title="Favorite TV Series" count={favoriteTvSeriesCount} />
            <StatCard title="Favorite Actors" count={favoriteActorsCount} />
            <StatCard title="Watchlist" count={watchlistCount} />
            <StatCard title="Rated" count={ratedCount} />
            <StatCard title="Average Score" count={averageScore} />
        </div>
    )
}

export default Stats
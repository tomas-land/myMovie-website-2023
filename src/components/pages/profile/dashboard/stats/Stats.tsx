import { getFavoriteMovies, getFavoriteTvSeries, getRatedTotal, getWatchlist } from '@/lib/requests/user'
import s from './stats.module.scss'
import NumberCounter from '@/components/pages/profile/dashboard/number_counter/NumberCounter'
import _ from 'lodash'


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
    const watchlistCount = (await getWatchlist()).length
    const ratedTotalCount = (await getRatedTotal()).length
    
    // Convert string ratings to numbers using map, and use loadsh function to get average
    const numericRatings = (await getRatedTotal()).map(item => Number(item.rating));
    const averageScore = Number(( _.mean(numericRatings)).toFixed(1))
  
    return (
        <div className={s.stats_container}>
            <StatCard title="Favorite Movies" count={favoriteMoviesCount} />
            <StatCard title="Favorite TV Series" count={favoriteTvSeriesCount} />
            <StatCard title="Favorite Actors" count={favoriteActorsCount} />
            <StatCard title="Watchlist" count={watchlistCount} />
            <StatCard title="Rated" count={ratedTotalCount} />
            <StatCard title="Average Score" count={averageScore} />
        </div>
    )
}

export default Stats
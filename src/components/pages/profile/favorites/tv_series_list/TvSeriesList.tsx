'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './tv_series_list.module.scss'
import { iFavorite } from '@/lib/interfaces/favorite';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';

interface iProps {
    moviesToDisplay: iFavorite[]
}

const TvSeriesList = ({ moviesToDisplay }: iProps) => {
    return (
        <div className={s.list}>
            {!moviesToDisplay ? <LoadingSpinner /> :
                (<div className={s.wrapper}>
                    {moviesToDisplay?.map((tvSeries: iFavorite) => (
                        <MovieCard
                            key={tvSeries.id}
                            tvSeries={tvSeries}
                            isQuickView={false}
                            mediaType='tv_series'
                            cardWidth='100%'
                        />
                    ))}
                </div>
                )
            }
            {moviesToDisplay?.length === 0 && <span className={s.no_favorites}>You don&apos;t have any favorite tv series yet</span>}
        </div>
    )
}

export default TvSeriesList

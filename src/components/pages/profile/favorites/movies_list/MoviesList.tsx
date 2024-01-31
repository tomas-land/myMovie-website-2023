'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import { iFavorite } from '@/lib/interfaces/favorite';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';

interface iProps {
    moviesToDisplay: iFavorite[]
}

const MoviesList = ({ moviesToDisplay }: iProps) => {
    return (
        <div className={s.list}>
            {!moviesToDisplay ? <LoadingSpinner /> : (
                <div className={s.wrapper}>
                    {moviesToDisplay?.map((movie: iFavorite) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isQuickView={false}
                            mediaType='movies'
                            cardWidth='100%'
                        />
                    ))}
                </div>
            )
            }
            {moviesToDisplay?.length === 0 && <span className={s.no_favorites}>You don&apos;t have any favorite movies yet</span>}
        </div>
    )
}

export default MoviesList


'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';

interface iProps {
    moviesToDisplay: iMovie[] | iTvSeries[] | undefined;
}

const MoviesList = ({ moviesToDisplay }: iProps) => {
    return (
        <div className={s.list}>
            {!moviesToDisplay ? <LoadingSpinner /> : (
                <div className={s.wrapper}>
                    {moviesToDisplay?.map((movie: iMovie | iTvSeries) => (
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


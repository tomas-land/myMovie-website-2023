'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { use, useState } from 'react';
import { useEffect } from 'react';

interface iProps {
  moviesToDisplay: iMovie[] | iTvSeries[] | undefined;
  text: string;
}

const MoviesList = ({ moviesToDisplay, text }: iProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(moviesToDisplay === undefined);
  }, [moviesToDisplay]);

  return (
    <div className={s.list}>
      {isLoading && <div className={s.loading_spinner}><LoadingSpinner /></div>}

      {!isLoading && !moviesToDisplay?.length && (
        <div className={s.no_favorites}>
          <h1>{text}</h1>
        </div>
      )}

      {!isLoading && moviesToDisplay && moviesToDisplay?.length > 0 && (
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
      )}
    </div>
  );
};

export default MoviesList

'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './tv_series_list.module.scss'
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { useState, useEffect } from 'react';

interface iProps {
  moviesToDisplay: iMovie[] | iTvSeries[] | undefined;
  headerTitle?: string;
  text: string;
}

const TvSeriesList = ({ moviesToDisplay, headerTitle, text }: iProps) => {
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
        <>
          <h1 className={s.headerTitle}>{headerTitle}</h1>
          <div className={s.wrapper}>
            {moviesToDisplay?.map((tv_series: iMovie | iTvSeries) => (
              <MovieCard
                key={tv_series.id}
                movie={tv_series}
                isQuickView={false}
                mediaType='tv_series'
                cardWidth='100%'
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TvSeriesList

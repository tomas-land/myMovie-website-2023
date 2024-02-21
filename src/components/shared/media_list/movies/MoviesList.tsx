'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

interface iProps {
  movies: iMovie[] | iTvSeries[] | undefined;
  headerTitle?: string;
  text?: string;
}

const MoviesList = ({ movies, headerTitle, text }: iProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedGenreId } = useGlobalContext();
  const [moviesToDisplay, setMoviesToDisplay] = useState<iMovie[] | iTvSeries[] | undefined>(movies);

  useEffect(() => {
    if (selectedGenreId) {
      const filteredMoviesByGenre = movies?.filter((movie) => movie.genre_ids?.includes(selectedGenreId));
      setMoviesToDisplay(filteredMoviesByGenre);
    }
    setIsLoading(movies === undefined);
  }, [movies, selectedGenreId]);

  return (
    <div className={s.list}>
      {isLoading && <div className={s.loading_spinner}><LoadingSpinner /></div>}

      {!isLoading && !moviesToDisplay?.length && (
        <div className={s.no_favorites}>
          <h1>{text}</h1>
        </div>
      )}

      {!isLoading && moviesToDisplay ? (
        <>
          <h1 className={s.headerTitle}>{headerTitle}</h1>
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
        </>
      ) : null}
    </div>
  );
};

export default MoviesList

'use client';
import { useState } from 'react';
import Image from 'next/image';
import { iMovie } from '@/lib/interfaces/movie';
import s from './movie_card.module.scss';
import QuickViewCard from '../quick_view_card/QuickViewCard';
import Link from 'next/link';
import MovieActionButtons from '@/components/shared/movie_action_buttons/MovieActionButtons';

interface iProps {
  movie: iMovie;
}

const MovieCard = ({ movie }: iProps) => {
  const [isQuickViewOpened, setIsQuickViewOpened] = useState(false);

  const toggleQuickView = () => {
    setIsQuickViewOpened((prevState) => !prevState);
  };

  return (
    <div className={s.movie_card}>
      <div className={s.movie_card_wrapper}>
        <div className={s.poster_wrapper}>
          <Link href={`/movie/${movie.id}`}>
            <Image className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} sizes="100vw" width={'0'} height={'0'} />
          </Link>
          <div className={s.btns}>
            <button className={s.btn} onClick={toggleQuickView}>
              {isQuickViewOpened ? 'Close' : 'Quick View'}
            </button>
            <Link href={`/movie/${movie.id}`}>
              <button className={s.btn}>Full Review</button>
            </Link>
          </div>
        </div>
        <div className={s.content}>
          <h3 className={s.title}>{movie.title}</h3>
          <MovieActionButtons movie={movie} />
        </div>
      </div>
      {isQuickViewOpened ? <QuickViewCard movie={movie} setIsQuickViewOpened={setIsQuickViewOpened} /> : null}
    </div>
  );
};

export default MovieCard;

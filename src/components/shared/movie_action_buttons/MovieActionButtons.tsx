'use client';

import { useState } from 'react';
import s from './movie_action_buttons.module.scss';
import {iMovie} from '@/lib/interfaces/movie';
import { FiHeart, FiStar, FiBookmark } from 'react-icons/fi';

interface iProps {
  movie: iMovie;
}

const MovieActionButtons = ({ movie }: iProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };
  const toggleWatchlist = () => {
    setIsInWatchlist((prevState) => !prevState);
  };
  return (
    <div className={s.action_btns}>
      <div className={s.rating}>
        <span>{movie.vote_average.toFixed(1)}</span>
      </div>
      <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`}>
        <FiStar size={25} onClick={toggleFavorite} />
      </button>
      <button className={`${s.btn} ${isInWatchlist ? s.fill_icon : ''}`}>
        <FiHeart size={25} onClick={toggleWatchlist} />
      </button>
      <button className={s.btn}>
        <FiBookmark size={25} />
      </button>
    </div>
  );
};

export default MovieActionButtons;

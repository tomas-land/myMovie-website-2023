'use client';
import s from './quick_view_card.module.scss';
import { iMovie } from '@/lib/interfaces/movie';
import { IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface iProps {
  movie: iMovie;
  setIsQuickViewOpened: React.Dispatch<React.SetStateAction<boolean>>;
  genres: [{ id: string; name: string }] | undefined;
}

const QuickViewCard = ({ movie, setIsQuickViewOpened, genres }: iProps) => {

  const closeQuickView = () => {
    setIsQuickViewOpened(false);
  };

  return (
    <motion.div className={s.quick_view} initial={{ x: 150 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
      <div className={s.quick_view_content}>
        <button className={s.close_btn} onClick={closeQuickView}>
          <IoCloseOutline size={30} />
        </button>
        <h1 className={s.title}>{movie.title}</h1>
        <div className={s.genres}>
          {genres?.map((genre) => (
            <span className={s.genre} key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
        <p className={s.overview}>{movie.overview}</p>
        <h4 className={s.release_date}>Release date &nbsp; {movie.release_date}</h4>
      </div>
    </motion.div>
  );
};

export default QuickViewCard;

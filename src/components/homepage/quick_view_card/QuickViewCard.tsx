'use client';
import s from './quick_view_card.module.scss';
import {iMovie} from '@/lib/interfaces';
import { IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface iProps {
  movie: iMovie;
  setIsQuickViewOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickViewCard = ({ movie, setIsQuickViewOpened }: iProps) => {
  const [genres, setGenres] = useState<[{ id: string; name: string }]>();
  const closeQuickView = () => {
    setIsQuickViewOpened(false);
  };
  useEffect(() => {
    const fetchMovieGenres = async () => {
      const response = await axios.get('/api/movies/movie_by_id', { params: { id: movie.id } });
      const genres = response.data.data.genres;
      setGenres(genres);
      return genres;
    };
    fetchMovieGenres();
  }, []);

   
  return (
    <motion.div className={s.quick_view} initial={{ x: 150 }} animate={{ x:0 }} transition={{ duration: 0.5 }}>
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

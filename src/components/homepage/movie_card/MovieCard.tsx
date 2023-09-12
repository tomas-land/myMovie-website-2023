"use client"
import { useState } from 'react'
import Image from 'next/image'
import iMovie from '@/lib/interfaces'
import { FiHeart, FiStar } from 'react-icons/fi'
import { IoPlayOutline } from 'react-icons/io5'
import s from './movie_card.module.scss'
import Link from 'next/link'

interface iProps {
  movie: iMovie
}

const MovieCard = ({ movie }: iProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState);
  };
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const toggleWatchlist = () => {
    setIsInWatchlist(prevState => !prevState);
  };

  return (
    <div className={s.movie_card}>
      <div className={s.poster_wrapper}>
        <Image className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} sizes='100vw' width={'0'} height={'0'} />
        <div className={s.btns}>
          <button className={s.btn}>Quik View</button>
          <Link href={`/movies/${movie.id}`}><button className={s.btn}>Full Review</button></Link>
        </div>
      </div>
      <div className={s.content}>
        <h3 className={s.title}>{movie.title}</h3>
        <div className={s.btns}>
          <div className={s.rating}><span>7.6</span></div>
          <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`}><FiStar size={25} onClick={toggleFavorite} /></button>
          <button className={`${s.btn} ${isInWatchlist ? s.fill_icon : ''}`}><FiHeart size={25} onClick={toggleWatchlist} /></button>
          <button className={s.btn}><IoPlayOutline size={30} /></button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
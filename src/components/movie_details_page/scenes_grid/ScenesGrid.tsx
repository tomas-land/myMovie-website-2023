'use client';
import { iMovie, iMovieImages } from '@/lib/interfaces';
import s from './scenes_grid.module.scss';
import Image from 'next/image';
import { useState } from 'react';

interface iProps {
  movieImages: iMovieImages;
  movie: iMovie;
}

const ScenesGrid = ({ movieImages, movie }: iProps) => {
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  const toggleShowMoreImages = () => {
    setIsGridExpanded(prev => !prev);
  };
console.log(movieImages)
  return (
    <div className={s.scenes_wrapper}>
      <div className={`${s.scenes_grid} ${isGridExpanded ? s.expanded_grid : ''}`}>
        {movieImages.backdrops?.map((scene) => (
          <div className={s.scene}>
            <Image className={s.scene_img} key={scene.id} src={`https://image.tmdb.org/t/p/w500/${scene.file_path}`} alt={movie.title} fill loading="lazy" />
          </div>
        ))}
      </div>
      <button className={s.show_more_btn} onClick={toggleShowMoreImages}>
        {isGridExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

export default ScenesGrid;

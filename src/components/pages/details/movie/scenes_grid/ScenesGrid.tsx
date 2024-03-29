'use client';
import { iMovie, iMovieImage } from '@/lib/interfaces/movie';
import s from './scenes_grid.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';

interface iProps {
  movieImages: iMovieImage[];
  movie: iMovie;
}

const ScenesGrid = ({ movieImages, movie }: iProps) => {
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  const toggleShowMoreImages = () => {
    setIsGridExpanded((prev) => !prev);
  };

  return (
    <>
    {movieImages.length > 0 ? 
    <div className={s.scenes_wrapper}>
      <h2 className={s.title}>Backdrops</h2>
      <div className={`${s.scenes_grid} ${isGridExpanded ? s.expanded_grid : ''} ${movieImages.length < 3 ? s.remove_mask : null}`}>
        {movieImages?.map((scene) => (
          <div className={s.scene} key={scene.file_path}>
            <Image className={s.scene_img} src={`https://image.tmdb.org/t/p/w500/${scene.file_path}`} alt={movie.title} fill loading="lazy" />
          </div>
        ))}
      </div>
      {movieImages.length > 3 ? <SecondaryButton label={isGridExpanded ? 'Show less' : 'Show more'} handleClick={toggleShowMoreImages} /> : null}
    </div>  : null}
    </>
  );
};

export default ScenesGrid;

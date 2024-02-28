'use client';
import s from './scenes_grid.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { iTvSeries, iTvSeriesImage } from '@/lib/interfaces/tv_series';

interface iProps {
  images: iTvSeriesImage[];
  tvSeries: iTvSeries
}

const ScenesGrid = ({ images, tvSeries }: iProps) => {
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  const toggleShowMoreImages = () => {
    setIsGridExpanded((prev) => !prev);
  };

  return (
    <>
      {images.length > 0 ? <div className={s.scenes_wrapper}>
        <h1 className={s.title}>Backdrops</h1>
        <div className={`${s.scenes_grid} ${isGridExpanded ? s.expanded_grid : ''} ${images.length < 3 ? s.remove_mask : null}`}>
          {images?.map((scene) => (
            <div className={s.scene} key={scene.file_path}>
              <Image className={s.scene_img} src={`https://image.tmdb.org/t/p/w500/${scene.file_path}`} alt={tvSeries.name || 'image'} fill loading="lazy" />
            </div>
          ))}
        </div>
        {images.length > 3 ? <SecondaryButton label={isGridExpanded ? 'Show less' : 'Show more'} handleClick={toggleShowMoreImages} /> : null}
      </div> : null}
    </>
  );
};

export default ScenesGrid;

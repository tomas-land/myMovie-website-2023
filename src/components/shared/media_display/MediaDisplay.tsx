"use client"
import MediaSlider from '../media_slider/MediaSlider';
import s from './media_display.module.scss';
import Slider from '@/components/shared/slider/Slider';
import { iFavorite } from '@/lib/interfaces/favorite';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { useState } from 'react';



interface iProps {
  headerTitle: string;
  endpoint?: string;
  movies?:  iMovie[] | iFavorite[];
  tvSeries?: iTvSeries[] | iFavorite[];
  userProfile?: boolean;
  isQuickView?: boolean;
  cardWidth: string;
}

const MediaDisplay = ({ headerTitle, endpoint, movies, tvSeries, userProfile, isQuickView, cardWidth }: iProps) => {
  const [mediaType, setMediaType] = useState<string>('movies')

  const selectMediaType = (category: string) => {
    setMediaType(category)
  }

  return (
    < div className={s.content_display} >
      <div className={s.header}>
        <div className={s.title}>{headerTitle}</div>
        <MediaSlider selectMediaType={selectMediaType} selectedMediaType={mediaType} />
      </div>
      <div className={s.content}>
        <Slider movies={movies} tvSeries={tvSeries} endpoint={endpoint} userProfile={userProfile} mediaType={mediaType} isQuickView={isQuickView} cardWidth={cardWidth} />
      </div>
    </div >
  );
};

export default MediaDisplay;

"use client"
import MediaSlider from '../media_slider/MediaSlider';
import s from './content_display.module.scss';
import Slider from '@/components/pages/homepage/slider/Slider';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { useState, useEffect } from 'react';



interface iProps {
  headerTitle: string;
  endpoint?: string;
  movies: iMovie[];
  tvSeries: iTvSeries[];
  profile?: boolean;
  redirectTo?: string;
  isQuickView?: boolean;
}

const ContentDisplay = ({ headerTitle, endpoint, movies, tvSeries, profile, redirectTo, isQuickView }: iProps) => {
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
        <Slider movies={movies} tvSeries={tvSeries} endpoint={endpoint} profile={profile} redirectTo={redirectTo} mediaType={mediaType} isQuickView={isQuickView} />
      </div>
    </div >
  );
};

export default ContentDisplay;

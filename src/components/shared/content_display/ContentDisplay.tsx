"use client"
import MediaSlider from '../media_slider/MediaSlider';
import s from './content_display.module.scss';
import Slider from '@/components/pages/homepage/slider/Slider';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { useState } from 'react';


interface iProps {
  headerTitle: string;
  endpoint: string;
  movies: iMovie[];
  tvSeries: iTvSeries[];
  profile?: boolean;
  redirectTo?: string;
}

const ContentDisplay = ({ headerTitle, endpoint, movies, tvSeries, profile, redirectTo }: iProps) => {
  const [mediaType, setMediaType] = useState<string>('movies')
  const [selectedMediaType, setSelectedMediaType] = useState<boolean>(false)

  const selectMediaType = (category: string) => {
    setMediaType(category)
  }

  return (
    <div className={s.content_display}>
      <div className={s.header}>
        <div className={s.title}>{headerTitle}</div>
        <MediaSlider selectMediaType={selectMediaType} />
      </div>
      <div className={s.content}>
        <Slider movies={movies} tvSeries={tvSeries} endpoint={endpoint} mediaType={mediaType} profile={profile} redirectTo={redirectTo} />
      </div>
    </div>
  );
};

export default ContentDisplay;

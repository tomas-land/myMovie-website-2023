import s from './movies_display.module.scss';
import Slider from '@/components/shared/slider/Slider';
import { iMovie } from '@/lib/interfaces';
import Skeleton from 'react-loading-skeleton';

interface iProps {
  movies: iMovie[];
  headerTitle: string;
  endpoint: string;
}

const MoviesDisplay = ({ movies, headerTitle, endpoint }: iProps) => {
  return (
    <>
      <div className={s.movies_display} key={Math.random()}>
        <div className={s.header}>
          <h1 className={s.title}>{headerTitle}</h1>
        </div>
        <div className={s.movies_slider}>
          <Slider movies={movies} endpoint={endpoint} />
        </div>
      </div>
    </>
  );
};

export default MoviesDisplay;

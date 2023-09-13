import s from './movies_display.module.scss';
import Slider from '@/components/shared/slider/Slider';
import iMovie from '@/lib/interfaces';

interface iProps {
  movies: iMovie[];
  headerTitle: string;
}

const MoviesDisplay = ({ movies, headerTitle }: iProps) => {
  return (
    <section className={s.movies_display}>
      <div className={s.header}>
        <h1 className={s.title}>{headerTitle}</h1>
      </div>
      <div className={s.movies_slider}>
        <Slider movies={movies} />
      </div>
    </section>
  );
};

export default MoviesDisplay;

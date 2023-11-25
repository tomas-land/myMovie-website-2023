import s from './movies_display.module.scss';
import Slider from '@/components/pages/homepage/slider/Slider';
import { iMovie } from '@/lib/interfaces/movie';
import { ToastContainer } from 'react-toastify';

interface iProps {
  headerTitle: string;
  children: React.ReactNode;
}

const MoviesDisplay = ({ headerTitle, children }: iProps) => {
  return (
    <>
      <div className={s.movies_display}>
        <div className={s.header}>
          <h1 className={s.title}>{headerTitle}</h1>
        </div>
        <ToastContainer/>
        {children}
      </div>
    </>
  );
};

export default MoviesDisplay;

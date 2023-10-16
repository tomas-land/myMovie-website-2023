import s from './backdrop_image.module.scss';
import Image from 'next/image';
import { iMovie } from '@/lib/interfaces';

interface iProps {
  movie: iMovie;
}

const BackdropImage = ({ movie }: iProps) => {
  return (
    <div className={s.image_wrapper}>
      <Image className={s.backdrop_image} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} fill />
    </div>
  );
};

export default BackdropImage;

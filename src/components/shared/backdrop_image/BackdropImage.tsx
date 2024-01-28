import s from './backdrop_image.module.scss';
import Image from 'next/image';
import { iMovie } from '@/lib/interfaces/movie';
import { iPerson } from '@/lib/interfaces/person';
import { iTvSeries } from '@/lib/interfaces/tv_series';

interface iProps {
  movie?: iMovie;
  person?: iPerson;
  tvSeries?: iTvSeries;
}

const BackdropImage = ({ movie, person, tvSeries }: iProps) => {
  const backdrop_path = movie ? movie.backdrop_path : person ? person.profile_path : tvSeries ? tvSeries.backdrop_path : null;
  const alt = movie?.title || person?.name || tvSeries?.name || 'image';
  
  return (
    <div className={s.image_wrapper}>
      <Image className={s.backdrop_image} priority src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={alt} fill />
    </div>
  );
};

export default BackdropImage;

import s from '@/components/movie_details_page/movie_details/movie_details.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {
  return <div className={s.movie_details} style={{ marginTop: '27rem', height: '30rem' }}></div>;
};

export default loading;

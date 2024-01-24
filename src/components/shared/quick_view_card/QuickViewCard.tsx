'use client';
import s from './quick_view_card.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';


interface iProps {
  setIsQuickViewOpened: React.Dispatch<React.SetStateAction<boolean>>;
  genres?: [{ id: string; name: string }];
  title?: string;
  releaseDate?: string;
  overview?: string;
  additionalInfo?: [{ genres: [{ id: string; name: string }]; last_air_date?: string; season_numbers?: number }];
  mediaType: string;
}

const QuickViewCard = ({ title, releaseDate, overview, setIsQuickViewOpened, additionalInfo, mediaType }: iProps) => {

  const closeQuickView = () => {
    setIsQuickViewOpened(false);
  };

  return (
    <motion.div className={s.quick_view} initial={{ x: 150 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
      <div className={s.quick_view_content}>
        <button className={s.close_btn} onClick={closeQuickView}>
          <IoCloseOutline size={30} />
        </button>
        <h1 className={s.title}>{title}</h1>
        <div className={s.genres}>
          {additionalInfo?.[0]?.genres.map((genre) => (
            <span className={s.genre} key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <p className={s.overview}>{overview}</p>
        <div className={s.additional_info}>
          {mediaType === 'tv_series' ? (
            <>
              <h4 className={s.season_numbers}>Seasons &nbsp; {additionalInfo?.[0]?.season_numbers}</h4>
              <h4 className={s.last_air_date}>Last air date &nbsp; {additionalInfo?.[0]?.last_air_date}</h4>
            </>) : (<h4 className={s.release_date}>Release date &nbsp; {releaseDate}</h4>)}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickViewCard;

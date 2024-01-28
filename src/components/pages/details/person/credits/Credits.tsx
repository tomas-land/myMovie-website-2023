import React from 'react';
import s from './credits.module.scss';
import { iPerson, iPersonMovieCredit } from '@/lib/interfaces/person';
import dayjs from 'dayjs';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';
import { FaFilm } from 'react-icons/fa';
import Link from 'next/link';

interface iProps {
    person: iPerson;
    personMovieCredits: iPersonMovieCredit[];
  }

const Credits = ({person,personMovieCredits}:iProps) => {

  const renderMovieCredits = () => {
        return personMovieCredits.map((movie) => {
          return (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className={s.movie} key={movie.id}>
                <div className={s.poster_wrapper}>
                  <ImageFrame imagePath={movie.poster_path} alt={movie.title} icon={<FaFilm />} width={60} height={96} />
                </div>
                <div className={s.info}>
                  <h3 className={s.release_date}>{dayjs(movie.release_date).format('YYYY')}</h3>
                  <h3 className={s.movie_title}>{movie.title}</h3>
                  <p className={s.character}>{movie.character}</p>
                </div>
              </div>
            </Link>
          );
        });
      };
      
  return (
    <div>
      <section className={s.credits_wrapper}>
        {person.known_for_department === 'Acting' ? (
          <section className={s.credits}>
            <h2 className={s.title}>Acting</h2>
            <div className={s.movies}>{personMovieCredits.length > 0 ? renderMovieCredits() : null}</div>
          </section>
        ) : null}
        {/* {person.known_for_department === 'Directing' ? (
          <section className={s.credits}>
            <h2 className={s.title}>Directing</h2>
            <div className={s.movies}>{personMovieCredits.length > 0 ? renderMovieCredits() : null}</div>
          </section>
        ) : null} */}
      </section>
    </div>
  );
};

export default Credits;

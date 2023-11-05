'use client';
import React, { useState } from 'react';
import s from './person_details.module.scss';
import Image from 'next/image';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { iPerson, iPersonMovieCredit } from '@/lib/interfaces/person';
import dayjs from 'dayjs';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';
import { FaFilm } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import Link from 'next/link';

interface iProps {
  person: iPerson;
  personMovieCredits: iPersonMovieCredit[];
}

const PersonDetails = ({ person, personMovieCredits }: iProps) => {
  const [bioTextExpanded, setBioTextExpanded] = useState(false);
  const currentAge = Number(dayjs().format('YYYY')) - Number(dayjs(person.birthday).format('YYYY'));
  const lifespan = Number(dayjs(person.deathday).format('YYYY')) - Number(dayjs(person.birthday).format('YYYY'));

  const expandBioText = () => {
    setBioTextExpanded((prev) => !prev);
  };

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
    <div className={s.person_details}>
      <div className={s.backdrop}></div>
      <div className={s.left_column}>
        <div className={s.poster_wrapper}>
          <ImageFrame imagePath={person.profile_path} alt={person.name} icon={<IoPerson />} width={256} height={384} />
        </div>
        <div className={s.facts}>
          {person.birthday && (
            <div className={s.fact}>
              <p>
                <strong>Age</strong>
              </p>
              <p>{person.deathday ? `Died at ${lifespan}` : currentAge}</p>
            </div>
          )}
          {person.gender !== null && person.gender !== 0 && (
            <div className={s.fact}>
              <p>
                <strong>Gender</strong>
              </p>
              <p>{person.gender === 2 ? 'Male' : 'Female'}</p>
            </div>
          )}
          {person.known_for_department && (
            <div className={s.fact}>
              <p>
                <strong>Known for</strong>
              </p>
              <p>{person.known_for_department}</p>
            </div>
          )}
          {person.birthday && (
            <div className={s.fact}>
              <p>
                <strong>Birthday</strong>
              </p>
              <p>{person.birthday}</p>
            </div>
          )}
          {person.deathday && (
            <div className={s.fact}>
              <p>
                <strong>Deathday</strong>
              </p>
              <p>{person.deathday}</p>
            </div>
          )}
          {person.place_of_birth && (
            <div className={s.fact}>
              <p>
                <strong>Birth place</strong>
              </p>
              <p>{person.place_of_birth}</p>
            </div>
          )}
        </div>
      </div>
      <div className={s.right_column}>
        <section className={s.bio}>
          <h2 className={s.name}>{person.name}</h2>
          {!person.biography ? (
            <div className={s.no_bio}>
              <p>No biography found</p>
            </div>
          ) : (
            <div className={`${s.bio_text} ${bioTextExpanded ? s.bio_text_expanded : ''}`}>
              {person.biography}
              <div className={s.mask_overlay}></div>
            </div>
          )}
          {!person.biography ? null : (
            <div className={s.btn_wrapper}>
              <SecondaryButton handleClick={expandBioText} label={bioTextExpanded ? 'show less' : 'show more'} />
            </div>
          )}
        </section>
        <section className={s.credits_wrapper}>
          {person.known_for_department === 'Acting' ? (
            <section className={s.credits}>
              <h2 className={s.title}>Acting</h2>
              <div className={s.movies}>{personMovieCredits.length > 0 ? renderMovieCredits() : null}</div>
            </section>
          ) : null}
          {person.known_for_department === 'Directing' ? (
            <section className={s.credits}>
              <h2 className={s.title}>Directing</h2>
              <div className={s.movies}>{personMovieCredits.length > 0 ? renderMovieCredits() : null}</div>
            </section>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default PersonDetails;

{
  /* <div className={s.no_credits}>
<p>No acting credits found</p>
</div> */
}

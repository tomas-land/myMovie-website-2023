'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { iPerson } from '@/lib/interfaces/person';
import s from './person_card.module.scss';
import Link from 'next/link';


interface iProps {
  person: iPerson;
  cardWidth: string;
}

const PersonCard = ({ person, cardWidth }: iProps) => {

  return (
    <div className={s.person_card} >
      <div className={`${s.wrapper}`} style={{ width: cardWidth }}>
        <div className={s.poster_wrapper} >
          <Link href={`/person/${person.id}`}>
            <Image className={s.poster} src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} width={'500'} height={'750'} />
          </Link>
        </div>
        <div className={s.info}>
          <h3 className={s.name}>{person.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

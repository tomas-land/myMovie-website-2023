'use client';

import React from 'react';
import s from './bio.module.scss';
import { useState } from 'react';
import { iPerson } from '@/lib/interfaces/person';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { useEffect, useRef } from 'react';

interface iProps {
  person: iPerson;
}

const Bio = ({ person }: iProps) => {
  const [bioTextExpanded, setBioTextExpanded] = useState(false);
  const [bioTextHeight, setBioTextHeight] = useState<number | null>(null);
  const bioTextRef = useRef<HTMLDivElement>(null);
  
  const expandBioText = () => {
    setBioTextExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (bioTextRef.current) {
      const clientHeight = bioTextRef.current.clientHeight;
      setBioTextHeight(clientHeight);
    }
  }, [person.biography]);

  return (
    <section className={s.bio}>
      <h2 className={s.name}>{person.name}</h2>
      {!person.biography ? (
        <div className={s.no_bio}>
          <p>No biography found</p>
        </div>
      ) : (
        <div className={`${s.bio_text} ${bioTextExpanded ? s.bio_text_expanded : ''}`}>
          <p ref={bioTextRef}>{person.biography}</p>
          <div className={`${bioTextHeight !== null && bioTextHeight > 320 ? s.mask_overlay : null}`}></div>
        </div>
      )}
      {person.biography && bioTextHeight !== null && bioTextHeight > 320 ? (
        <div className={s.btn_wrapper}>
          <SecondaryButton handleClick={expandBioText} label={bioTextExpanded ? 'show less' : 'show more'} />
        </div>
      ) : null}
    </section>
  );
};

export default Bio;

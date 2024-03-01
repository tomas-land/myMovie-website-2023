'use client'
import PersonCard from '@/components/shared/person_card/PersonCard';
import s from './actors_list.module.scss'
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { useState } from 'react';
import { iFavoriteActor } from '@/lib/interfaces/favorite';

interface iProps {
  favoriteActors: iFavoriteActor[] | undefined;
  headerTitle?: string;
  text?: string;
}

const ActorsList = ({ favoriteActors, headerTitle, text }: iProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <div className={s.list}>
      <h1 className={s.headerTitle}>{headerTitle}</h1>

      {!isLoading && (
        <div className={s.wrapper}>
          {favoriteActors?.length === 0 && (
            <div className={s.no_results}>
              <h1>{text}</h1>
            </div>
          )}

          {favoriteActors ? (
            favoriteActors?.map((person: iFavoriteActor) => (
              <PersonCard
                key={person.id}
                person={person}
                cardWidth='100%'
              />
            ))
          ) : null}
        </div>
      )}

      {isLoading && (
        <div className={s.loading_spinner}>
          <LoadingSpinner />
        </div>
      )}

    </div>
  );
};

export default ActorsList

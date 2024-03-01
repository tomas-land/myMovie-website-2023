'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { iPerson } from '@/lib/interfaces/person';
import { iFavoriteActor } from '@/lib/interfaces/favorite';
import s from './person_card.module.scss';
import Link from 'next/link';
import { toggleFavoriteActor } from '@/lib/actions/toggleFavoriteActor';
import { FiHeart } from 'react-icons/fi';
import Tooltip from '@/components/shared/tooltip/Tooltip';
import { useSession } from 'next-auth/react';
import { toastError, toastSuccess } from '@/lib/toasts';
import 'react-toastify/dist/ReactToastify.css';


interface iProps {
  person: iPerson | iFavoriteActor ;
  cardWidth: string;
}

const PersonCard = ({ person, cardWidth }: iProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const personId = person.personId ?? person.id ; // if the person is a favorite actor, use personId, otherwise use id that comes from the TMDB API
  
  
  useEffect(() => {
    if (isAuthenticated) {
      // fetch favorite actors from database and check if the current actor is in the list
      const fetchFavoriteActors = async () => {
        try {
          const response = await fetch('/api/favorites/actors/all_favorites');
          const favoriteActors = await response.json();
          const isFavorite = favoriteActors.some((person: iFavoriteActor) => person.personId === personId);
          setIsFavorite(isFavorite);
        } catch (error) {
          console.error('Error fetching favorite actors:', error);
        }
      }
      fetchFavoriteActors();
    }
  }, [isAuthenticated]);


  const handleAddFavorite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      toggleFavoriteActor(person).then(result => toastSuccess(result.message))
      setIsFavorite(!isFavorite);

    } catch (error) {
      console.error('Error adding actor to favorites:', error);
      toastError(`Error adding actor to favorites`)
    }

  }

  return (
    <div className={s.person_card} >
      <div className={`${s.wrapper}`} style={{ width: cardWidth }}>
        <div className={s.poster_wrapper} >
          <Link href={`/person/${personId}`}>
            <Image className={s.poster} src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} width={'500'} height={'750'} />
          </Link>
        </div>
        <div className={s.info}>
          <div className={s.name}>{person.name}</div>
          <div className={s.btns}>
            <Tooltip tooltipText={isAuthenticated ? "Add or remove from favorites" : "You must sign-in in to add to favorites"}>
              <form onSubmit={handleAddFavorite}>
                <button type='submit' className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`} disabled={!isAuthenticated}>
                  <FiHeart size={25} />
                </button>
              </form>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

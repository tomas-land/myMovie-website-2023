'use client'

import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { iFavorite } from '@/lib/interfaces/favorite';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';


const MoviesList = () => {
    const { data: userFavorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`/api/favorites/all_favorites`);
                return data.favorites as iFavorite[];
            } catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        }
    });

    return (
        <ContentDisplay headerTitle='My favorite movies' >
            <div className={s.list}>
                {userFavorites?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </ContentDisplay>
    )
}

export default MoviesList
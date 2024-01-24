'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import Filter from '@/components/shared/filter/Filter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { iFavorite } from '@/lib/interfaces/favorite';
import { useState } from 'react';

const MoviesList = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    const { data: userFavorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`/api/favorites/all_favorites`);
                return data.favorites as iFavorite[];
            } catch (error) {
                console.error('Error fetching user favorites:', error);
                throw error;
            }
        },
    });

    // const handleResultChange = (result: iFavorite[]) => {
    //     setFilteredData([...result]);  //destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    // }

    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavorites;

    return (
        <>
            {/* <Filter userFavorites={userFavorites} onResultChange={handleResultChange} /> */}
            <div className={s.list}>
                {/* <ContentDisplay headerTitle="Favorites" movies={moviesToDisplay} /> */}
            </div>
        </>
    )
}

export default MoviesList
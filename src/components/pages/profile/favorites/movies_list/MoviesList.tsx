'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import Filter from '@/components/shared/filter/Filter';
import { iFavorite } from '@/lib/interfaces/favorite';
import { useState } from 'react';
import useUserData from '@/hooks/reactQuery/useUserData';


const MoviesList = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    const handleResultChange = (result: iFavorite[]) => {  //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
        setFilteredData([...result]);
    }

    const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteMovies;

    return (
        <>
            <Filter userFavorites={userFavoriteMovies} onResultChange={handleResultChange} />
            <div className={s.list}>
                <div className={s.wrapper}>
                    {moviesToDisplay?.map((movies: iFavorite) => (
                        <MovieCard
                            key={movies.id}
                            movie={movies}
                            isQuickView={false}
                            mediaType='movies'
                            cardWidth='100%'
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MoviesList
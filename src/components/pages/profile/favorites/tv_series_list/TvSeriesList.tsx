'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './tv_series_list_list.module.scss'
import Filter from '@/components/shared/filter/Filter';
import { iFavorite } from '@/lib/interfaces/favorite';
import { useState } from 'react';
import useUserData from '@/hooks/reactQuery/useUserData';


const TvSeriesList = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    const handleResultChange = (result: iFavorite[]) => {  //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
        setFilteredData([...result]);
    }

    const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteTvSeries;

    return (
        <>
            <Filter userFavorites={userFavoriteTvSeries} onResultChange={handleResultChange} />
            <div className={s.list}>
                <div className={s.wrapper}>
                    {moviesToDisplay?.map((tvSeries: iFavorite) => (
                        <MovieCard
                            key={tvSeries.id}
                            // tvSeries={tvSeries}
                            isQuickView={false}
                            mediaType='tv_series'
                            cardWidth='100%'
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default TvSeriesList
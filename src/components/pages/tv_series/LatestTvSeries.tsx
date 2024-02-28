"use client"
import React, { useEffect, useState } from 'react'
import { iMovie } from '@/lib/interfaces/movie'
import { iTvSeries } from '@/lib/interfaces/tv_series'
import s from './latest_tv_series.module.scss'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import { useGlobalContext } from '@/context/GlobalContext'
import { usePathname, useRouter } from 'next/navigation'


interface iProps {
    tvSeries: iTvSeries[] ;
    headerTitle: string;
    query: string;
}

const LatestMovies = ({ tvSeries, headerTitle, query }: iProps) => {
    const [initialData, setInitialData] = useState<iMovie[] | iTvSeries[] | undefined>(tvSeries)
    const { selectedGenreId, setSelectedGenreId } = useGlobalContext();
    const pathname = usePathname()
    const { replace } = useRouter()

    useEffect(() => {
        if (query) {
            const filteredMoviesByQuery = tvSeries.filter((tv_series) => tv_series?.name?.toLowerCase().includes(query.toLowerCase()))
            setInitialData(filteredMoviesByQuery)
            setSelectedGenreId(null)
        }
        else if (selectedGenreId) {
            const filteredMoviesByGenre = tvSeries.filter((tv_series) => tv_series.genre_ids?.includes(selectedGenreId))
            setInitialData(filteredMoviesByGenre)
            replace(`${pathname}`)
        } else {
            setInitialData(tvSeries)
        }
    }, [query, selectedGenreId, pathname, tvSeries])

    useEffect(() => {
        setSelectedGenreId(null); // Set selectedGenreId to null on component mount to reset the genre filter
    }, []);

    return (
        <div className={s.list}>
            <h1 className={s.headerTitle}>{headerTitle}</h1>
            <div className={s.wrapper}>
                {initialData?.length === 0 && <div className={s.no_results}><h1>No tv-series found</h1></div>}
                {initialData ? (
                    initialData?.map((tvSeries: iTvSeries) => (
                        <MovieCard
                            key={tvSeries.id}
                            tvSeries={tvSeries}
                            isQuickView={false}
                            mediaType='tv_series'
                            cardWidth='100%'
                        />
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default LatestMovies
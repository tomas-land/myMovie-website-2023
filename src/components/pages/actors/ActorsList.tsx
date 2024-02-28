"use client"
import React, { useEffect, useState } from 'react'
import { iMovie } from '@/lib/interfaces/movie'
import { iTvSeries } from '@/lib/interfaces/tv_series'
import s from './latest_movies.module.scss'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import { useGlobalContext } from '@/context/GlobalContext'
import { usePathname, useRouter } from 'next/navigation'


interface iProps {
    movies: iMovie[];
    headerTitle: string;
    query: string;
}

const LatestMovies = ({ movies, headerTitle, query }: iProps) => {
    const [initialData, setInitialData] = useState<iMovie[] | iTvSeries[] | undefined>(movies)
    const { selectedGenreId, setSelectedGenreId } = useGlobalContext();
    const pathname = usePathname()
    const { replace } = useRouter()

    useEffect(() => {
        if (query) {
            const filteredMoviesByQuery = movies.filter((movie: iMovie) => movie.title.toLowerCase().includes(query.toLowerCase()))
            setInitialData(filteredMoviesByQuery)
            setSelectedGenreId(null)
        }
        else if (selectedGenreId) {
            const filteredMoviesByGenre = movies.filter((movie: iMovie) => movie.genre_ids?.includes(selectedGenreId))
            setInitialData(filteredMoviesByGenre)
            replace(`${pathname}`)
        } else {
            setInitialData(movies)
        }
    }, [query, selectedGenreId, pathname, movies])

    useEffect(() => {
        setSelectedGenreId(null); // Set selectedGenreId to null on component mount to reset the genre filter
    }, []);

    return (
        <div className={s.list}>
            <h1 className={s.headerTitle}>{headerTitle}</h1>
            <div className={s.wrapper}>
                {initialData?.length === 0 && <div className={s.no_results}><h1>No movies found</h1></div>}
                {initialData ? (
                    initialData?.map((movie: iMovie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isQuickView={false}
                            mediaType='movies'
                            cardWidth='100%'
                        />
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default LatestMovies
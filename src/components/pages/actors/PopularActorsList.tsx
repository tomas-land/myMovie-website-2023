"use client"
import React, { useEffect, useState } from 'react'
import { iPerson } from '@/lib/interfaces/person'
import s from './popular_actors.module.scss'
import { useGlobalContext } from '@/context/GlobalContext'
import { usePathname, useRouter } from 'next/navigation'
import PersonCard from '@/components/shared/person_card/PersonCard'


interface iProps {
    popularActors: iPerson[] | undefined;
    headerTitle: string;
    query: string;
}

const ActorsList = ({ popularActors, headerTitle, query }: iProps) => {
    const [initialData, setInitialData] = useState<iPerson[] | undefined>(popularActors)
    const { selectedGenreId, setSelectedGenreId } = useGlobalContext();
    const pathname = usePathname()
    const { replace } = useRouter()

    useEffect(() => {
        // if (query) {
        //     const filteredMoviesByQuery = actors.filter((movie: iMovie) => movie.title.toLowerCase().includes(query.toLowerCase()))
        //     setInitialData(filteredMoviesByQuery)
        //     setSelectedGenreId(null)
        // }
        // else if (selectedGenreId) {
        //     const filteredMoviesByGenre = actors.filter((movie: iMovie) => movie.genre_ids?.includes(selectedGenreId))
        //     setInitialData(filteredMoviesByGenre)
        //     replace(`${pathname}`)
        // } else {
        //     setInitialData(actors)
        // }
    }, [query, selectedGenreId, pathname, popularActors])

    useEffect(() => {
        setSelectedGenreId(null); // Set selectedGenreId to null on component mount to reset the genre filter
    }, []);

    return (
        <div className={s.list}>
            <h1 className={s.headerTitle}>{headerTitle}</h1>
            <div className={s.wrapper}>
                {initialData?.length === 0 && <div className={s.no_results}><h1>No movies found</h1></div>}
                {initialData ? (
                    initialData?.map((person: iPerson) => (
                        <PersonCard
                            key={person.id}
                            person={person}
                            cardWidth='100%'
                        />
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default ActorsList
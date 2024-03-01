"use client"
import React, { useEffect, useState } from 'react'
import { iPerson } from '@/lib/interfaces/person'
import s from './popular_actors.module.scss'
import PersonCard from '@/components/shared/person_card/PersonCard'


interface iProps {
    popularActors: iPerson[] | undefined;
    headerTitle: string;
    query: string;
}

const PopularActorsList = ({ popularActors, headerTitle, query }: iProps) => {
    const [initialData, setInitialData] = useState<iPerson[] | undefined>(popularActors)


    useEffect(() => {
        console.log(query)
        if (query) {
            const filteredMoviesByQuery = popularActors?.filter((actor: iPerson) => actor.name.toLowerCase().includes(query.toLowerCase()))
            setInitialData(filteredMoviesByQuery)
        }
    }, [query])

    return (
        <div className={s.list}>
            <h1 className={s.headerTitle}>{headerTitle}</h1>
            <div className={s.wrapper}>
                {initialData?.length === 0 && <div className={s.no_results}><h1>Not found</h1></div>}
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

export default PopularActorsList
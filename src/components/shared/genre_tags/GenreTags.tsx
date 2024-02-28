'use client';
import { iGenre } from '@/lib/interfaces/movie'
import s from './genre_tags.module.scss'
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { useGlobalContext } from '@/context/GlobalContext';

interface iGenreTagsProps {
    genres: iGenre[]
}

const GenreTags = ({ genres }: iGenreTagsProps) => {
    const { selectedGenreId, setSelectedGenreId } = useGlobalContext();

    const handleGenreClick = (genreID: number) => {
        setSelectedGenreId(genreID);
    }

    return (
        <div>
            <Splide
                className={s.genres}
                options={{
                    rewind: true,
                    pagination: false,
                    gap: 10,
                    arrows: false,
                    autoWidth: true,
                    autoHeight: true,
                    breakpoints: {
                        768: {
                            gap: 5,
                        },
                    },
                }}
            >
                {/*first tag for selecting all genres */}
                <SplideSlide key={0} onClick={() => setSelectedGenreId(null)}>
                    <span className={`${s.tag} ${selectedGenreId === null ? s.active : ''}`}>All</span>
                </SplideSlide>
                {/* map through all genres and display them */}
                {genres.map((genre) => (
                    <SplideSlide key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                        <span className={`${s.tag} ${selectedGenreId === genre.id ? s.active : ''}`}>{genre.name}</span>
                    </SplideSlide>
                ))}
            </Splide>
        </div>

    )
}

export default GenreTags
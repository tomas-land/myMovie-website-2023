'use client';
import { iMovieGenre } from '@/lib/interfaces/movie'
import s from './genre_tags.module.scss'
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { useGlobalContext } from '@/context/GlobalContext';

interface iGenreTagsProps {
    genres: iMovieGenre[]
}

const GenreTags = ({ genres }: iGenreTagsProps) => {
    const { setSelectedGenreId } = useGlobalContext();

    const handleGenreClick = (genreID: number) => {
        setSelectedGenreId(genreID);
    }

    return (
        <div>
            <Splide
                className={s.genres}
                options={{
                    rewind: true,
                    gap: '1rem',
                    pagination: false,
                    arrows: false,
                    autoWidth: true,
                    autoHeight: true,
                }}
            >
                {genres.map((genre) => (
                    <SplideSlide key={genre.id} className={s.tag}>
                        <div onClick={() => handleGenreClick(genre.id)}>{genre.name}</div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>

    )
}

export default GenreTags
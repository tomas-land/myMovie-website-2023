"use client"

import React from 'react'
import s from './media_slider.module.scss'

enum MediaCategory {
    MOVIES = 'movies',
    TV_SERIES = 'tv_series',
}

interface iProps {
    selectMediaType: (category: string) => void
    selectedMediaType?: string
}

const MediaSlider = ({ selectMediaType, selectedMediaType }: iProps) => {

    return (
        <div className={s.media_slider}>
            <div className={s.wrapper}>
                <button
                    className={`${s.btn} ${selectedMediaType === MediaCategory.MOVIES ? s.active : ''}`}
                    onClick={() => selectMediaType(MediaCategory.MOVIES)}>
                    Movies
                </button>
                <button
                    className={`${s.btn} ${selectedMediaType === MediaCategory.TV_SERIES ? s.active : ''}`}
                    onClick={() => selectMediaType(MediaCategory.TV_SERIES)}>
                    TV-series
                </button>
            </div>
        </div>)
}

export default MediaSlider
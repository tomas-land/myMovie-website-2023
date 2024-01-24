"use client"

import React from 'react'
import s from './media_slider.module.scss'


enum MediaCategory {
    MOVIES = 'movies',
    TV_SERIES = 'tv_series',
}

interface iProps {
selectMediaType: (category: string) => void
}

const MediaSlider = ({selectMediaType}:iProps) => {


    return (
        <div className={s.media_slider}>
            <div className={s.wrapper}>
                <button
                    className={s.btn}
                    onClick={() => selectMediaType(MediaCategory.MOVIES)}>
                    Movies
                </button>
                <button
                    className={s.btn}
                    onClick={() => selectMediaType(MediaCategory.TV_SERIES)}>
                    TV-series
                </button>
            </div>
        </div>)
}

export default MediaSlider
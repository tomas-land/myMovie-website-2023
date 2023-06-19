"use client"

import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import Image from 'next/image';
import s from '@styles/components/UI/slider.module.scss'


const Slider = ({ movies }: any) => {
  return (
    <Splide className={s.slider} options={{
      type: 'loop',
      perPage: 5,
      perMove: 1,
      gap: '1rem',
      pagination: false,
      arrows: false,
      autoWidth: true,
    }
    } >
      {
        movies.map((movie: any) => (
          <SplideSlide key={movie.id}>
            <div>
              <Image className={s.image} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} sizes='100vw' width={'0'} height={'0'} />
            </div>
          </SplideSlide>
        ))
      }
    </Splide >
  )
}

export default Slider